const formatNumber = num => {
    if (typeof num != "number") throw Error("harus angka")
    return num.toLocaleString("id")
}

export default formatNumber
