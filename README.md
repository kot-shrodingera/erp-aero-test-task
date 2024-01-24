# Prerequisites

* You need to have a running MySQL server on your machine.
* You need to create the database schema and tables using the following SQL query:

```sql
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS `test`.`users` (
  `id` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `refresh_token` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `test`.`files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `extension` VARCHAR(45) NOT NULL,
  `mimetype` VARCHAR(45) NOT NULL,
  `size` INT NOT NULL,
  `upload_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `filename` (`name`, `extension`));
```

# Installation

* Clone this repository to your local machine.
* Install the required packages using your preferred package manager (e.g., npm, yarn, etc.).
* Create a .env file in the root directory of the project with the following settings:
```
SV_PORT=<server port> # default: 3000
DB_HOST=<mysql server hostname> # default: localhost
DB_PORT=<mysql server port> # default: 3306
DB_USER=<mysql user> # default: root
DB_PASSWORD=<mysql password> # default: root
DB_DATABASE=<mysql database> # default: test
JWT_ACCESS_SECRET=<the secret key for the access token> # required
JWT_REFRESH_SECRET=<the secret key for the refresh token> # required
UPLOADS_PATH=<files upload path> # default: uploads/
```
# Running

To run the project, use the following npm script:

```sh
npm run ts-node
```
