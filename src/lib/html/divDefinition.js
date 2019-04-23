export function defineHTML($, $element, divName) {
    $element.empty();
    let html = "<div id='" + divName + "'style='height:80%; width:100%'></div>";
    $element.html(html);
}
