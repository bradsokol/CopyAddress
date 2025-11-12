# Copy Address

Copy Address is a web extension for the Safari browser. It copies the title and address of the current tab to the
clipboard in Markdown format. For example: `[GitHub](https://github.com/)`

## Motivation

My primary reason for creating this extension was to be able to easily copy page addresses in Markdown format using
a keyboard shortcut. There are extensions in the Apple App Store that copy addresses to the clipboard as Markdown, but either don't support shortcuts for
some reason, or have additional functionality that I don't need.

Secondary reasons for building this were to learn a little bit about browser extentions and also about AI-based coding.
After generating the initial project using the Xcode template, all of the code was written using [Cursor](https://cursor.com/). Only this README file is entirely human-generated.

## Installation

At the moment, the only way to use the extension is to build and run from Xcode.

After downloading the source, run the project to install the extension in Safari. Once the extension is installed, you
no longer need Xcode to use the extension. A small container app will be left running. This can be exitted and no longer
needs to be run.

## Usage

In Safari settings (Safari -> Settings -> Extensions), ensure that the Copy Address extension is enabled. You can also
set a keyboard shortcut here.

To copy the title and address of the current page as Markdown, click the Copy Address button in the toolbar or enter
your configured shortcut.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://raw.githubusercontent.com/bradsokol/CopyAddress/refs/heads/main/LICENSE)
