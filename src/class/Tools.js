import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export let copyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>

// ---------------------------------------------------------------------------------------------------------------------------- //
function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export function getAddress(address) {
    //const addr = address.slice(0,6) + '...' + address.slice(-4)

    return <div className="address">
        <span className="text-truncate">{address}</span>{copyToClipboardButton(address)}
    </div>
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export function linkAddress(address) {
    const addr = address.slice(0,7) + '...' + address.slice(-7)

    return <span>
        <Link to={`/address/${address}`}>
            {addr}
        </Link>{copyToClipboardButton(address)}
    </span>
}

export function secondsToMinutes(seconds) {
    if(seconds === 0) return "Instant creation";
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor((seconds % 3600)/60);
    let second = seconds - hours*3600 - minutes*60;

    let result = ""
    if(hours > 0){
        result+= hours+" hrs ";
    }

    if(minutes > 0){
        result+= minutes+" min ";
    }

    if(second > 0){
        result+= second+" sec";
    }

    return result;
}

// ---------------------------------------------------------------------------------------------------------------------------- //
export function linkCopyAddress(address) {
    const addr = address.slice(0,7) + '...' + address.slice(-7)

    return <span>
        <Link to={`/address/${address}`}>{addr}</Link>{copyToClipboardButton(address)}
    </span>
}

export function copyToClipboardButton(text) {
    return <Button variant="link" size="sm" className="copy-button table-button" onClick={() => copyToClipboard(text)}>{copyIcon}</Button>
}

//a fonction to timestamp to date
export function unixToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}