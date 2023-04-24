/* global BigInt */
const B58Alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const CoinChar = "N";   // Char for addresses

class DivResult {
    constructor(
        quotient,
        difference
    ){
        this.quotient = quotient;
        this.difference = difference;
    }
}

const defaultToastOptions = {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}
export const balance2Currency = (value) => {
    value = String(value);
    while(value.length < 9){
        value = "0"+value;
    }

    let coinStyle = value.substring(0,value.length-8)+"."+value.substring(value.length-8);
    return coinStyle;
}

const isValid58 = (base58Text) => {
    for(let c=0;c<base58Text.length;c++){
        if(B58Alphabet.indexOf(base58Text[c]) === -1){
            return false;
        }
    }
    return true;
}

const BMDividir = (numberA, divisor) => {
    let quotient = "";
    let step = "";

    for(let i=0;i<numberA.length;i++){
        step += numberA[i];
        if(parseInt(step) >= parseInt(divisor)){
            quotient += String(parseInt(parseInt(step)/parseInt(divisor)));
            step = String(parseInt(parseInt(step)%parseInt(divisor)));
        }else{
            quotient += "0";
        }
    }
    let r = new DivResult(BigInt(quotient).toString(), BigInt(step).toString());
    return r;
}

const BMDecto58 = (number) => {
    let resultDiv;
    let difference;
    let result = "";
    let decimalValue = String(number);

    while(decimalValue.length >= 2){
        resultDiv = BMDividir(decimalValue, 58);
        decimalValue = resultDiv.quotient;
        difference = resultDiv.difference;
        result = B58Alphabet[parseInt(difference)] + result;
    }

    if(parseInt(decimalValue) >= 58){
        resultDiv = BMDividir(decimalValue, 58);
        decimalValue = resultDiv.quotient;
        difference = resultDiv.difference;
        result = B58Alphabet[parseInt(difference)] + result;
    }

    if(parseInt(decimalValue) > 0){
        result = B58Alphabet[parseInt(decimalValue)] + result;
    }

    return result;
}

const BM58Resumen = (number58) => {
    let total = 0;
    for(let i =0;i<number58.length;i++){
        total += B58Alphabet.indexOf(number58[i]);
    }
    return total;
}

export const isValidAddress = (address) => {
    if(address[0] === 'N' && address.length > 20){
        let OrigHash = address.substring(1,address.length-2);
        if(isValid58(OrigHash)){
            let clave = BMDecto58(BM58Resumen(OrigHash));
            OrigHash = CoinChar + OrigHash + clave;
            if(OrigHash === address) return true;
        }
    }
    return false
}