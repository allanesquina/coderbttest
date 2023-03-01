const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // In case the event is not set, the function returns its default value
  if (!event) return TRIVIAL_PARTITION_KEY;

  // If the event has the partition key, converts it to a string value
  // If it is not a string and sets to the candidate var
  if (event.partitionKey) {
    const candidate =
      typeof event.partitionKey !== "string"
        ? JSON.stringify(event.partitionKey)
        : event.partitionKey;

    // Here I'm not sure if the stringify(partitionKey) could be greater then MAX_PARTITION_KEY_LENGTH
    // That is why I will keep this validation
    return candidate.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(candidate).digest("hex")
      : candidate;
  }
  // If there is no partitionKey generates and returns a hash with 128 chars length
  else {
    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }
};
