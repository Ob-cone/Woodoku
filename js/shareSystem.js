function getTileInfo(){
    let bytes= Array(81);

    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            let tile = getTile(r,c);
            let add = 0;
            if(tile.className.includes("fill")){
                add = 1;
            }
            bytes[9*r+c] = add;
        }
    }
    let base64 = btoa(String.fromCharCode(...compress(bytes)));
    return encodeURIComponent(base64);

}

function compress(bits) {
    if (bits.length !== 81) throw new Error("길이는 81이어야 함");

    const bytes = new Uint8Array(11);
    for (let i = 0; i < 81; i++) {
        const byteIndex = Math.floor(i / 8);
        const bitIndex = 7 - (i % 8); // 앞에서부터 밀어넣기
        if (bits[i]) bytes[byteIndex] |= (1 << bitIndex);
    }
    return bytes;
}

let shareButton = document.getElementById("share");
let link = getShareLink();

function getShareLink(){
    let tile = getTileInfo();
    let scores = encodeURIComponent(btoa(`${score}`));

    let blocks = document.querySelectorAll(".block");
    let blockInfo = [];
    blocks.forEach(b => {
        blockInfo.push(b.blockIndex);
    });

    blockInfo = encodeURIComponent(btoa(String.fromCharCode(...blockInfo)));

    let link = `share.html?tilemap=${tile}&score=${scores}&blocks=${blockInfo}`;
    if(nowMod === 1){
        let min = (sec - sec%60)/60;
        let secc =  (sec - sec%1)%60;
        let time = `${min}:${secc}`;
        time = encodeURIComponent(btoa(time));
        link = `${link}&time=${time}`;
    }

    return link;
}

shareButton.onclick = () => {
    let name = prompt("Name: ");
    name = encodeURIComponent(btoa(encodeURIComponent(name)));
    link = `${link}&name=${name}`;
    if(navigator.share){
        navigator.share({
            title: "Woodoku 점수 공유",
            text: `${score}점`,
            url: link
        })
    }
    else {
        window.open(link);
    }
}