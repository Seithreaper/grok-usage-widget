# Grok Bot Usage Widget for macOS

A small desktop widget that shows how much of your weekly Grok Bot usage pool is left, how it splits between Grok Bot and your other apps, when it resets, and which bots used the most.

It runs on [Übersicht](https://tracesof.net/uebersicht/), a free, open-source widget app for macOS.

## Install

```bash
git clone https://github.com/Seithreaper/grok-usage-widget.git
cd grok-usage-widget
./install.sh
```

The script installs Übersicht with Homebrew if you don't have it, copies the widget into Übersicht's widgets folder, and starts the app. The widget shows up in the top-right corner of your desktop, behind open windows.

To have it start on its own after a restart, click the Übersicht icon in the menu bar and turn on **Launch at login**.

## Updating the numbers

The widget reads `usage.json` in `~/Library/Application Support/Übersicht/widgets/usage/` every 5 minutes. It ships with example data. Replace the values with your own, by hand or from a scheduled job (for example, ask your Grok Bot to refresh it a few times a day).

```json
{
  "asOf": "Nov 3, 6:52 PM CT",
  "poolUsed": 7.4,
  "grokBot": 4.2,
  "otherApps": 3.2,
  "resets": "Tue Nov 10, 4:02 PM CT",
  "bots": [["Research bot", 40], ["Email bot", 35]]
}
```

- `poolUsed`: percent of the weekly pool used across all apps.
- `grokBot` and `otherApps`: how that used share splits.
- `resets`: when the weekly pool resets, as text.
- `bots`: each bot's share of Grok Bot's usage, as name and percent pairs (optional).

## Troubleshooting

If nothing shows up, open http://127.0.0.1:41416/ in a browser. If you see an error like `Can't walk dependency graph`, Übersicht was started from a shell with `NODE_PATH` set. Quit it and start it again from Finder or with `install.sh`.

## License

MIT
