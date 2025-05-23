import {
  regexifyBundleId,
  renameKeys,
  startsWithCapital,
  transformObjectKey,
} from "@/utils"
import { manipulatorKeys } from "~/constants"
import { bundleId as bid } from "bundle-id"
import { from } from "./from"
import { to } from "./to"
import { toAfterKeyUp } from "./to-after-key-up"
import { toIfAlone } from "./to-if-alone"
import { toIfHeldDown } from "./to-if-held-down"

export const rules = async ({
  app,
  bundleId,
  config,
}: {
  app?: string
  bundleId?: string
  config: { [key: string]: any }
}): Promise<any[]> => {
  const result = []

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === "string") value = { to: value }

    // ~ flatten application group
    if (startsWithCapital(key)) {
      const appConfig = await rules({
        app: key.toLowerCase(),
        bundleId: regexifyBundleId(await bid(key)),
        config: value,
      })
      result.push(...appConfig)
      continue
    }

    // ~ flatten group
    if (value.hasOwnProperty("_self")) {
      const _self = {
        [key]: value._self,
      }
      delete value._self
      const rest = Object.fromEntries(
        Object.entries(value).map(([k, v]) => [`${key} ${k}`, v]),
      )
      const transformedConfig = await rules({
        app,
        bundleId,
        config: { ..._self, ...rest },
      })
      result.push(...transformedConfig)
      continue
    }

    value = renameKeys(value, manipulatorKeys)

    const object = {
      type: "basic",
      description: bundleId ? `${app} ${key}` : key,
      from: key,
      ...value,
      ...(bundleId && {
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: [bundleId],
          },
        ],
      }),
    }

    transformObjectKey(object, "from", from)
    transformObjectKey(object, "to_after_key_up", toAfterKeyUp)
    transformObjectKey(object, "to_if_alone", toIfAlone)
    transformObjectKey(object, "to_if_held_down", toIfHeldDown)
    transformObjectKey(object, "to", to)

    result.push(object)
  }

  return result
}
