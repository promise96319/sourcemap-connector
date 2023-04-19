# Sourcemap Connector

A web extension for connect sourcemap to bundled code.


## Why use?

When issues arise in the online environment, it is often due to the lack of sourcemaps that debugging bugs is difficult. Fortunately, Chrome provides the addSourceMap method, which allows you to add local sourcemap files to packaged code, enabling you to debug using the source code.

However, the manual method of adding sourcemaps is relatively cumbersome, and after the browser refreshes, the sourcemap files are lost, making it very inconvenient. Therefore, to address this issue, it can be resolved by specifying the sourcemap folder, and then automatically matching the local sourcemap files corresponding to the requested file name when the website is refreshed, saving development and debugging time.

## How to use?

1. Open `chrome://extensions/` in your browser, and load the extension.
2. Click the extension icon to open the popup page.
3. Enter the directory of the sourcemap file in the input box, and upload this directory.
4. After the upload is successful, you can refresh the page to see the effect.
