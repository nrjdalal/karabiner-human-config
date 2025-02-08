# Karabiner-Human-Config

## The easiest way to write Karabiner-Elements configuration files, ever!

[![npm](https://img.shields.io/npm/v/karabiner-human-config?color=red&logo=npm)](https://www.npmjs.com/package/karabiner-human-config)
[![npm](https://img.shields.io/npm/dt/karabiner-human-config?color=red&logo=npm)](https://www.npmjs.com/package/karabiner-human-config)
[![GitHub](https://img.shields.io/github/stars/nrjdalal/karabiner-human-config?color=blue)](https://github.com/nrjdalal/karabiner-human-config)

Find it on the official website of Karabiner-Elements at [external JSON generators](https://karabiner-elements.pqrs.org/docs/json/external-json-generators).

Creating configuration files for [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements) can be challenging. With Karabiner-Human-Config (KHC), you can effortlessly generate your own configuration files using human-readable/understandable syntax.

<br/>

## Usage

Just create a new configuration file `karabiner.human.json`:

- Don't hold back on the [comments](#comments).
- Use [custom aliases](#custom-aliases) like `caps` `hyper` `cmd` `ctrl` etc.
- Specify `t` `a` etc as [manipulator key's aliases](#manipulator-keys-aliases).
- Prefix [flags and delays](#prefix-delay-and-flags) like `100` easily, if needed.
- Use `$` for [shell command](#shell-command).
- Just use the [app's name](#application-group-keys) like `Visual Studio Code`.

```json
{
  // direct
  "caps": { "t": "hyper", "a": "100 caps" },
  "hyper spacebar": "cmd spacebar",
  // group
  "fn": {
    "_self": { "t": "fn", "a": "cmd tab" },
    "spacebar": "cmd spacebar",
    "v": "$ open -a 'Visual Studio Code'"
  },
  // application group
  "Visual Studio Code": {
    "fn tilde": "ctrl tilde"
  }
}
```

And run the following command:

```bash
npx karabiner-human-config
```

And voila! From 10-15 lines to 170+ lines of configuration in just a few seconds.

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "caps",
                "from": {
                  "key_code": "caps_lock"
                },
                "to": [
                  {
                    "key_code": "left_shift",
                    "modifiers": [
                      "left_command",
                      "left_control",
                      "left_option"
                    ]
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "caps_lock",
                    "hold_down_milliseconds": 100
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "hyper spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "left_command",
                      "left_control",
                      "left_option",
                      "left_shift"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "spacebar",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn",
                "from": {
                  "key_code": "fn"
                },
                "to": [
                  {
                    "key_code": "fn"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "tab",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "spacebar",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn v",
                "from": {
                  "key_code": "v",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "shell_command": "open -a 'Visual Studio Code'"
                  }
                ]
              }
            ]
          },
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "visual studio code fn tilde",
                "from": {
                  "key_code": "grave_accent_and_tilde",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "grave_accent_and_tilde",
                    "modifiers": [
                      "left_control"
                    ]
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": [
                      "^com\\.microsoft\\.VSCode$"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

<br/>

The generated configuration will be logged to the console.
You can then manually copy and paste it into your `karabiner.json` file.

<br/>

## Table of Contents

- [Types of Addressing](#types-of-addressing)
  - [Comments](#comments)
  - [Direct Keys](#direct-keys)
  - [Group Keys](#group-keys)
  - [Application Group Keys](#application-group-keys)
- [Advanced Usage for From Events](#advanced-usage-for-from-events)
  - [Optional Modifiers](#optional-modifiers)
- [Advanced Usage for To Events](#advanced-usage-for-to-events)
  - [Shell Command](#shell-command)
  - [Prefix Delay and Flags](#prefix-delay-and-flags)
  - [Specify Multiple Events](#specify-multiple-events)
- [Alias](#alias)
  - [Custom Aliases](#custom-aliases)
  - [Manipulator Key's Aliases](#manipulator-keys-aliases)
- [Future Considerations](#future-considerations)

<br/>

## Types of Addressing

### Comments

Don't hold back on the comments. They are your best friend. KHC will strip them out before generating the configuration.

### Direct Keys

Use `string` values if there's only `to` event. In case of multiple events, use `object` values. Read more at [specifying multiple events](#specify-multiple-events).

```json
{
  "hyper spacebar": "cmd spacebar",
  "caps": { "t": "hyper", "a": "100 caps" }
}
```

### Group Keys

Instead of repeating the same key beginning, use group keys.

```diff
{
-  "fn": { "t": "fn", "a": "cmd tab" },
-  "fn spacebar": "cmd spacebar",
-  "fn v": "$ open -a 'Visual Studio Code'",
+  "fn": {
+    "_self": { "t": "fn", "a": "cmd tab" },
+    "spacebar": "cmd spacebar",
+    "v": "$ open -a 'Visual Studio Code'"
+  }
}
```

Note: Currently, `_self` is required to create a group key.

### Application Group Keys

Use application names if you want to specify key mappings for a specific application. Don't worry about finding bundle identifiers, just use the app name.

```json
{
  "Visual Studio Code": {
    "fn tilde": "ctrl tilde"
  }
}
```

<br/>

## Advanced Usage for From Events

### Optional Modifiers

Use `|` to specify optional modifiers.

```diff
{
-  "fn spacebar: "left_command spacebar"
+  "fn spacebar | any": "left_command spacebar"
}
```

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ],
                    "optional": [
                      "any"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "spacebar",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

<br/>

## Advanced Usage for To Events

### Shell Command

Use `$` to specify a shell command.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn spacebar": "$ open -a 'Google Chrome'"
}
```

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "shell_command": "open -a 'Google Chrome'"
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

### Prefix Delay and Flags

Prefix with `lazy`, `repeat`, `halt` to set flags. Or `number` to specify a delay.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn spacebar": "100 lazy repeat halt left_command spacebar"
}
```

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn spacebar",
                "from": {
                  "key_code": "spacebar",
                  "modifiers": {
                    "mandatory": [
                      "fn"
                    ]
                  }
                },
                "to": [
                  {
                    "lazy": true,
                    "repeat": true,
                    "halt": true,
                    "hold_down_milliseconds": 100,
                    "key_code": "spacebar",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

### Specify Multiple Events

Instead of strings, use objects like `{ to: ..., to_if_alone: ... }` to specify multiple to events.

```diff
{
-  "fn spacebar": "left_command spacebar"
+  "fn": { "to": "fn", "to_if_alone": "left_command tab" }
}
```

<details><summary>Generated: karabiner.json</summary><br/><pre>
{
  "global": {
    "show_in_menu_bar": false
  },
  "profiles": [
    {
      "complex_modifications": {
        "rules": [
          {
            "manipulators": [
              {
                "type": "basic",
                "description": "fn",
                "from": {
                  "key_code": "fn"
                },
                "to": [
                  {
                    "key_code": "fn"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "tab",
                    "modifiers": [
                      "left_command"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "name": "nrjdalal",
      "selected": true,
      "virtual_hid_keyboard": {
        "keyboard_type_v2": "ansi"
      }
    }
  ]
}
</pre></details>

<br/>

## Alias

- [key_codes by Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements/blob/main/src/apps/SettingsWindow/Resources/simple_modifications.json)

### Custom Aliases

- `hyper` for `left_command left_control left_option left_shift`
- `left_command` for `lcmd` `l_cmd` `left_cmd`

Check out [custom-aliases.ts](constants/custom-aliases.ts) for more.

### Manipulator Key's Aliases

- `t` for `to`
- `a` for `to_if_alone`
- `h` for `to_if_held_down`

Check out [manipulator-keys.ts](constants/manipulator-keys.ts) for more.

<br/>

## Future Considerations

- you tell me, I just got to know about Karabiner-Elements two days before publishing this on Feb 07, 2025
