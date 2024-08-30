# YAML-JS Logging
![NPM License](https://img.shields.io/npm/l/%40yaml-js%2Fcore.logging)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yaml-js/core/build.yml)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/org.yaml-js.core?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/org.yaml-js.core?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Coverage](https://img.shields.io/sonar/coverage/org.yaml-js.core?server=https%3A%2F%2Fsonarcloud.io)
[![Known Vulnerabilities](https://snyk.io/test/github/yaml-js/core/badge.svg)](https://snyk.io/test/github/yaml-js/core/)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/yaml-js/core)

This package provides simple logging abstractions to be used by other YAML-JS projects.

## Installation

To install the YAML-JS Logging package, run the following command:

```bash
npm install @yaml-js/logging

or

yarn add @yaml-js/logging

```

## Usage

To use the YAML-JS Logging subsystem, import it into your project:

```javascript
import { getLogger } from '@yaml-js/core.logging'
```

Then, you can use the logger to log messages at different levels:

```javascript
const logger = getLogger("org.yam-js.sample.SampleItem")
logger.trace(() => 'This is a debug message'); // no output by default
logger.debug(() => 'This is a debug message'); // no output by default
logger.info(() => 'This is an info message');
logger.warn(() => 'This is a warning message');
logger.error(() => 'This is an error message');
```

By default, the logger will output messages to the console but only for level INFO and above. However, you can configure it to use a different logging backend if needed.

## Configuration

To configure the YAML-JS Logging subsystem, you can use the **initializeLogging** function

```javascript
import { LogLevel, LoggingConfiguration } from '@yaml-js/core.logging'

const config : LoggingConfiguration = {
  root: 'INFO',
  'com.example': 'DEBUG',
  'com.example.sub': 'ERROR',
  'com.other.info': LogLevel.INFO,
  'com.trace': LogLevel.TRACE,
}

initializeLogging(config);
 ```

## Contributing

Contributions to the YAML-JS Logging package are welcome! If you find a bug or have a feature request, please open an issue on the [GitHub repository](https://github.com/yaml-js/logging).
