const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a string value with no hash with event and int partition key lower then MAX_PARTITION_KEY_LENGTH", () => {
    const toCompare = 123;
    const event = { partitionKey: toCompare };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(toCompare.toString());
  });

  it("should return a string value with no hash with event and string partition key lower then MAX_PARTITION_KEY_LENGTH", () => {
    const toCompare = "lsfjpaoweifjaweopfi";
    const event = { partitionKey: toCompare };

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(toCompare.toString());
  });

  it("should return a hash of partitionKey with event and partition key greater then MAX_PARTITION_KEY_LENGTH", () => {
    const event = {
      partitionKey:
        "8ajwpeofiajwepfoijp2o3i14jp3ojasw90dfjPLASKDHJK!@HLK90swdfpkjhoh9pA*UD_lkjffweh-ASsdjklfhlkajshflkjhlkhlkjhlasjkdfhlkj23lkmansdvlhaslvjkhAIOFJPQW9Jp98jpaqwidjOPQSWIDJPQWOis8asudf8uasdf8uasd8fuasdfawe8fwe89fua0we89fu0f893fpo1i34l123piljfaspdoivupioqweprioqwjepri",
    };

    const toCompare = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(toCompare);
  });

  it("should return a hash with event and no partition key", () => {
    const event = { key: "powiepfaweiof" };
    const toCompare = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");

    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(toCompare);
  });
});
