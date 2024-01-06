import bcrypt from 'bcrypt'
export const hashPassword =async(plainPassword)=>{
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword,salt);
    return hashedPassword;
}

export const comparePassword=async(plainPassword,hashedPassword)=>{
   return await bcrypt.compare(plainPassword,hashedPassword);
}