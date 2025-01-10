import bcrypt from "bcrypt";
class EncryptionDecryption {
  static async hashedPassword(password) {
    const saltRounds = 10;
    const finalpassword = await bcrypt.hash(password, saltRounds);
    return finalpassword;
  }

  static async comparedPassword(hashedPassword, password) {
    return await bcrypt.compare(hashedPassword, password);
  }
}

export default EncryptionDecryption;
