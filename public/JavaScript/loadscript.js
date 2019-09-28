function ImportJS(url) {
    let request = (()=>{
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            return new ActiveXObject("MsXml2.XmlHttp");
        }
    })();
    let id = url.substring(13, url.length-3).replace(/\//g, '_');
    request.onreadystatechange = () => {
        if(request.readyState == 4) {
            if(request.responseText != null && !document.getElementById(id)) {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.text = request.responseText;
                script.id = id;
                document.getElementsByTagName('head').item(0).insertBefore(script, document.getElementsByTagName('script').item(0));
            }
        }
    }
    request.open('GET', url, false);
    request.send(null);
}