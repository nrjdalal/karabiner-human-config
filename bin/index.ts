#!/usr/bin/env node
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { parseArgs } from "node:util"
import { rules } from "@/lib/transformer"
import { author, name, version } from "~/package.json"
import stripJsonComments from "strip-json-comments"

const helpMessage = `Version:
  ${name}@${version}

Usage:
  $ ${name} [options]

Options:
  -i, --input    Input file path
                 Default: Current directory
  -v, --version  Display version number
  -h, --help     Display help message

Author:
  ${author.name} <${author.email}> (${author.url})`

const parse: typeof parseArgs = (config) => {
  try {
    return parseArgs(config)
  } catch (err: any) {
    throw new Error(`Error parsing arguments: ${err.message}`)
  }
}

const main = async () => {
  try {
    const { values } = parse({
      options: {
        input: { type: "string", short: "i", default: "auto" },
        output: { type: "string", short: "o", default: "auto" },
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    })

    if (values.version) {
      console.log(`${name}@${version}`)
      process.exit(0)
    }

    if (values.help) {
      console.log(helpMessage)
      process.exit(0)
    }

    if (values.input) {
      const config = {
        input:
          values.input === "auto"
            ? path.resolve(process.cwd() + "/karabiner.human.json")
            : path.resolve(values.input),
        output:
          values.output === "auto"
            ? path.resolve(os.homedir + "/.config/karabiner/karabiner.json")
            : path.resolve(values.output),
      }

      if (!fs.existsSync(config.input)) {
        throw new Error(
          `No input file: ${values.input === "auto" ? "karabiner.human.json" : config.input}`,
        )
      }

      const userConfig = JSON.parse(
        stripJsonComments(fs.readFileSync(config.input, "utf-8")),
      )

      const finalConfig = {
        global: {
          show_in_menu_bar: false,
        },
        profiles: [
          {
            complex_modifications: {
              rules: (
                await rules({
                  config: userConfig,
                })
              ).map((rule) => ({
                manipulators: [rule],
              })),
            },
            name: "nrjdalal",
            selected: true,
            virtual_hid_keyboard: {
              keyboard_type_v2: "ansi",
            },
          },
        ],
      }

      console.log(JSON.stringify(finalConfig, null, 2))
    }

    process.exit(0)
  } catch (err: any) {
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
}

main()
