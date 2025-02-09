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
  -i, --input    Input file path (default: konfig.json)
  -o, --output   Output file path (default: karabiner.json)
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
        // for development purposes
        logfile: { type: "boolean", short: "l" },
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

    const config = {
      input:
        values.input === "auto"
          ? path.resolve(process.cwd() + "/konfig.json")
          : path.resolve(values.input),
      output:
        values.output === "auto"
          ? path.resolve(process.cwd() + "/karabiner.json")
          : path.resolve(values.output),
    }

    if (!fs.existsSync(config.input)) {
      console.log(helpMessage)
      console.error(
        `\x1b[31m\nInput file doesn't exist: ${config.input}\n\x1b[0m`,
      )
      process.exit(1)
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

    if (values.logfile) {
      fs.writeFileSync(
        path.resolve(process.cwd() + "/.logfile.json"),
        JSON.stringify(finalConfig, null, 2),
      )
      process.exit(0)
    }

    fs.writeFileSync(
      path.resolve(config.output),
      JSON.stringify(finalConfig, null, 2),
    )

    process.exit(0)
  } catch (err: any) {
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
}

main()
