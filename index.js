const { execSync } = require("child_process");

function makeRecord(record) {
  return {
    command: record[0],
    pid: parseInt(record[1]),
    user: record[2],
    fd: record[3],
    type: record[4],
    device: record[5],
    size: record[6],
    node: parseInt(record[7]),
    name: record.slice(8).join(" "),
  }
}

function lsof(params) {
  const stdout = execSync("lsof " + params).toString();
  const lines = stdout.split("\n");
  lines.splice(0, 1);
  lines.splice(lines.length - 1, 1);
  const records = lines.map(line => {
    return makeRecord(line.split(" ").filter(value => {
      return value !== "";
    }));
  });
  return records;
}

module.exports = lsof;
