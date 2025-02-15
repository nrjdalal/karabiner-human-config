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
            ? path.resolve(process.cwd() + "/karabiner.json")
            : path.resolve(os.homedir() + "/.config/karabiner/karabiner.json")
          : path.resolve(values.output),
    }

    if (!fs.existsSync(config.input)) {
      console.log(helpMessage)
      console.error(
        `\x1b[31m\nInput file doesn't exist: ${config.input}\n\x1b[0m`,
      )
      process.exit(1)
    }

    let existingConfig: { profiles?: any[] } = {}
    try {
      existingConfig = JSON.parse(fs.readFileSync(config.output, "utf-8"))
    } catch {
      console.log(
        `\x1b[33m\nOutput file doesn't exist: ${config.output}\n\x1b[0m`,
      )
    }

    const userConfig = JSON.parse(
      stripJsonComments(fs.readFileSync(config.input, "utf-8")),
    )

    const finalConfig = {
      ...existingConfig,
      profiles: [
        {
          ...existingConfig.profiles?.[0],
          complex_modifications: {
            rules: (
              await rules({
                config: userConfig,
              })
            ).map((rule) => ({
              manipulators: [rule],
            })),
          },
        },
      ],
    }

    if (values.logfile) {
      fs.writeFileSync(
        path.resolve(process.cwd() + "/.logfile"),
        JSON.stringify(finalConfig, null, 2) + "\n",
      )
      process.exit(0)
    }

    fs.writeFileSync(
      path.resolve(config.output),
      JSON.stringify(finalConfig, null, 2) + "\n",
    )

    process.exit(0)
  } catch (err: any) {
    console.error(`\n${err.message}\n`)
    process.exit(1)
  }
}

main()
