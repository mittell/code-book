# CodeBook

CodeBook is a React App with a CLI, which lets you write Markdown and Code in the browser.

It features in-browser compilation of code, with rendering in a preview window.

CodeBook can be used to explain code concepts with example code in order to illustrate concepts.

## Online Demo

Try an online demo of CodeBook - [Link](https://magenta-snickerdoodle-92a520.netlify.app)

<i>Online Demo does not have Data Persistence functionality enabled.</i>

## CodeBook CLI

### Getting Started

To run the CodeBook CLI, the following command can be run from your terminal:

    npx @code-book-js/cli serve

This will create a <b>notebook.js</b> file in the directory you run it, so please run it within a directory you want to save your CodeBook files in.

### Opening/Saving to a New File

To create a new file, or open an existing one, specify the filename when running <b>serve</b>:

    npx @code-book-js/cli serve newFile.js

### Changing Ports

By default the CLI will run CodeBook on http://localhost:4005, in order to change the port, use the <b>-p</b> flag and specify a port to run on:

    npx @code-book-js/cli serve -p 4006

## CodeBook Source

### Getting Started

CodeBook uses [Lerna](https://lerna.js.org/) to manage each package.

Make sure Node.js is installed, and npm is up to date:

    npm@latest -g

---

<i>Due to several package version conflicts, we need to install the NPM packages for the local-client using the <b>--force</b> flag</i>.

<i>This will be fixed in a future version.</i>

Navigate to the local-client project from within the root project directory:

    cd code-book\packages\local-client\

Run the NPM install command with the <b>--force</b> flag:

    npm install --force

Make sure to navigate back to the root project directory before continuing.

---

Run the provided setup script:

    npm run setup

This will run two Lerna commands:

- <b>bootstrap</b> - Installs all NPM package for each project.
- <b>link</b> - Sets up links to local project dependencies.

You now have everything ready to run locally.

Run the local-api and local-client projects using the following:

    lerna run start

Navigate to the <b>dist</b>directory in the cli project:

    cd packages\cli\dist\

Run the following command to run the cli:

    node index.js serve

This will create a <b>notebook.js</b> file within the <b>dist</b> directory.

If you wish to save or open another file, specify the filename when running the <b>serve</b> command:

    node index.js serve newFile.js

Again a different port can also be specified:

    node index.js serve -p 4006

## Contact

Feel free to find and contact me at the following:

<div align="center">

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/CMittell)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chris-mittell/)
[![Mastodon](https://img.shields.io/badge/-MASTODON-%232B90D9?style=for-the-badge&logo=mastodon&logoColor=white)](https://techhub.social/@cmittell)

</div>
