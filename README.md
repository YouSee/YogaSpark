[![codecov](https://codecov.io/gh/YouSee/yoga-layout-spark-ui/branch/master/graph/badge.svg?token=gLNjJNaHDb)](https://codecov.io/gh/YouSee/yoga-layout-spark-ui)
[![CircleCI](https://circleci.com/gh/YouSee/YogaSpark.svg?style=svg)](https://circleci.com/gh/YouSee/yoga-layout-spark-ui)

# **YogaSpark**

YogaSpark is a JavaScript library for building user interfaces on top of the [Spark browser](http://www.sparkui.org). It's using an [Elm'ish Architecture](https://guide.elm-lang.org/architecture/) to build modular, testable and scalable applications. It utilizes the power of [yoga-layout](https://yogalayout.com/) to use [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and [absolute](https://developer.mozilla.org/en-US/docs/Web/CSS/position) positioning from css for positioning elements.

## **Run the examples**

### Download the spark browser

To run the examples you first need to install the spark browser for your OS you can download it [here](http://www.sparkui.org/docs/getting_started.html)

### Get the project

You can download the project by running the following command from a terminal

`git clone https://github.com/YouSee/YogaSpark`

### Install dependencies

To install the dependencies you first have to go into the project directory by typing

`cd YogaSpark`

from the terminal you cloned the project in. Then you can run this command to install all the `NPM` dependencies.

`npm install`

### Run Examples

To run the examples you can run the following command in the same terminal as the above comands.

`npm run start:example`

If you followed the above steps, the example app should now be available at `http://localhost:55555` in the spark browser! Try clicking around with the arrows to see some animations.
