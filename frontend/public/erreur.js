function mauvaisNomDeDomaine(){
    if(location.host !== "pdfou.com" && location.host !== "www.pdfou.com"){
        document.querySelector("html").remove();
    }
};
mauvaisNomDeDomaine();

function mauvaisProtocol(){
    if(location.protocol !== "https:"){
        location.protocol="https:";
    }
};
mauvaisProtocol();