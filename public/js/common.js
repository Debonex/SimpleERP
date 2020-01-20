function formatDate(input) {
    var dateTime = new Date(input);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();
    return (year + 1) + '-' + month + '-' + date + ' ' + addzero(hour) + ':' + addzero(minute) + ':' + addzero(second);
}

function addzero(time) {
    return time == 0 ? '00' : '0';
}