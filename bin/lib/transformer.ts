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

const mergeConditions = (parent?: any[], local?: any | any[]) => {
  if (!local) return parent
  const normalized = Array.isArray(local) ? local : [local]
  return [...(parent || []), ...normalized]
}

export const rules = async ({
  app,
  bundleId,
  conditions: parentConditions,
  config,
}: {
  app?: string
  bundleId?: string
  conditions?: any[]
  config: { [key: string]: any }
}): Promise<any[]> => {
  const result = []

  for (let [key, value] of Object.entries(config)) {
    if (typeof value === "string") value = { to: value }

    // ~ flatten application group
    if (startsWithCapital(key)) {
      const appConditions = value.hasOwnProperty("_conditions")
        ? mergeConditions(parentConditions, value._conditions)
        : parentConditions
      delete value._conditions

      const appConfig = await rules({
        app: key.toLowerCase(),
        bundleId: regexifyBundleId(await bid(key)),
        conditions: appConditions,
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

      // ~ extract group-level conditions
      const groupConditions = value.hasOwnProperty("_conditions")
        ? mergeConditions(parentConditions, value._conditions)
        : parentConditions
      delete value._conditions

      const rest = Object.fromEntries(
        Object.entries(value).map(([k, v]) => [`${key} ${k}`, v]),
      )
      const transformedConfig = await rules({
        app,
        bundleId,
        conditions: groupConditions,
        config: { ..._self, ...rest },
      })
      result.push(...transformedConfig)
      continue
    }

    // ~ flatten conditions-only group (has _conditions but no _self)
    if (value.hasOwnProperty("_conditions")) {
      const groupConditions = mergeConditions(
        parentConditions,
        value._conditions,
      )
      delete value._conditions

      const transformedConfig = await rules({
        app,
        bundleId,
        conditions: groupConditions,
        config: value,
      })
      result.push(...transformedConfig)
      continue
    }

    value = renameKeys(value, manipulatorKeys)

    // ~ merge all conditions: parent + bundleId + per-manipulator
    const mergedConditions = mergeConditions(
      mergeConditions(
        parentConditions,
        bundleId && {
          type: "frontmost_application_if",
          bundle_identifiers: [bundleId],
        },
      ),
      value.conditions,
    )

    const { conditions: _, ...valueWithoutConditions } = value

    const object = {
      type: "basic",
      description: bundleId ? `${app} ${key}` : key,
      from: key,
      ...valueWithoutConditions,
      ...(mergedConditions && { conditions: mergedConditions }),
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
