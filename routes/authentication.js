///// --[#]-- [REQUIRE] ----- >>>>>
  const bcrypt = require ('bcrypt');
///// --[@]-- [REQUIRE] ----- -END-

///// --[#]-- [PASSWORD OBFUSCATION EXAMPLE] ----- >>>>>
  function passObsf(clearTextPass)
  {
    let passIn         = clearTextPass;
  const salt1          = bcrypt.genSaltSync  (10, clearTextPass);
  const encryptedPass1 = bcrypt.hashSync     (clearTextPass, salt1);
  const saltedSalt     = bcrypt.genSaltSync  (10, encryptedPass1);
  const encryptedPass2 = bcrypt.hashSync     (clearTextPass, saltedSalt);
  return encryptedPass2;
  }

  let   input      = "the meaning of life, the universe, and everything is 42the meaning of life, the universe, and everything is 42the meaning of life, the universe, and everything is 42";
  const storedHash = passObsf(input);
  console.log(input + ' => ' + storedHash);
///// --[@]-- [PASSWORD OBFUSCATION EXAMPLE] ----- -END-
