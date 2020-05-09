const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic',
    defaultRepresentation: 'RGBA',
    comparison: false,
    adjustableNumbers: true,
    showAlways: true,
    autoReposition: true,
    inline:true,
    default: location.hash,
    position: 'right-end',
    swatches: [
        'rgb(244, 67, 54)',
        'rgb(233, 30, 99)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 181)',
        'rgb(33, 150, 243)',
        'rgb(3, 169, 244)',
        'rgb(0, 188, 212)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(139, 195, 74)',
        'rgb(205, 220, 57)',
        'rgb(255, 235, 59)',
        'rgb(255, 193, 7)'
    ],
    components: {
        preview: true,
        opacity: false,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: true,
            cmyk: true,
            input: true,
            clear: false,
            save: false
        }
    }
});

function setup () {
   var hash = location.hash
    var color = tinycolor(hash)

    if (color.isValid() ) {
        console.log("valid! - " + hash )
    } else {
        location.hash = "#656BB3"
    }
    setupTable ('analogous', "Analogous", "50%")

    setupTable ('monochromatic', "Monochromatic", "50%")
    setupTable ('complement', "Complementary", "50%")
    setupTable ('splitcomplement', "Split Complementary", "50%")
    setupTable ('triad', "Triad", "50%")
    setupTable ('tetrad', "Tetrad", "50%")
    setupTable ('colorinformation', "Color Information", "100%")

    pickr.setColor(hash)
}

function setupTable (name, title, size) {
    var table = document.createElement("table")
    var caption = document.createElement("caption")
    caption.innerText = title
    table.appendChild(caption)
    if (name == "colorinformation") {

    } else {
        var cr = document.createElement("tr")
        cr.id = name + "_cr"
        table.appendChild(cr)
        var hr = document.createElement("tr")
        hr.id = name + "_hr"
        table.appendChild(hr)
    }
    document.getElementById("schemes").appendChild(table)
}

function update (color) {
    var c = tinycolor(color)
    location.hash = c.toHexString()
    pickr.setColor(color)
    document.body.style.backgroundColor = c
    displayColorInfo(c)
    displayColorSchemes(c)
}

pickr.on('change', (color) => {
    update (color)
})

window.addEventListener("hashchange", function() {
    update(location.hash)
} )

function displayColorInfo () {

}

function displayColorSchemes (c) {
    var schemes = ["analogous", "splitcomplement", "complement", "monochromatic", "triad", "tetrad"]
    var analogous = c.analogous()
    analogous_cr.innerHTML = ""
    analogous_hr.innerHTML = ""
    for (var i = 0; i < analogous.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = analogous[i].toHexString()
        analogous_cr.appendChild(c_td)
        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+analogous[i].toHexString()+"'>"+analogous[i].toHexString()+"</a>"
        analogous_hr.appendChild(h_td)
    }


    var tetrad = c.tetrad()

    tetrad_cr.innerHTML = ""
    tetrad_hr.innerHTML = ""

    for (var i = 0; i < tetrad.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = tetrad[i].toHexString()
        tetrad_cr.appendChild(c_td)

        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+tetrad[i].toHexString()+"'>"+tetrad[i].toHexString()+"</a>"
        tetrad_hr.appendChild(h_td)
    }

    var triad = c.triad()

    triad_cr.innerHTML = ""
    triad_hr.innerHTML = ""

    for (var i = 0; i < triad.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = triad[i].toHexString()
        triad_cr.appendChild(c_td)

        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+triad[i].toHexString()+"'>"+triad[i].toHexString()+"</a>"
        triad_hr.appendChild(h_td)
    }

    var splitcomplement = c.splitcomplement()

    splitcomplement_cr.innerHTML = ""
    splitcomplement_hr.innerHTML = ""

    for (var i = 0; i < splitcomplement.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = splitcomplement[i].toHexString()
        splitcomplement_cr.appendChild(c_td)

        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+splitcomplement[i].toHexString()+"'>"+splitcomplement[i].toHexString()+"</a>"
        splitcomplement_hr.appendChild(h_td)
    }

    var monochromatic = c.monochromatic()

    monochromatic_cr.innerHTML = ""
    monochromatic_hr.innerHTML = ""

    for (var i = 0; i < monochromatic.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = monochromatic[i].toHexString()
        monochromatic_cr.appendChild(c_td)

        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+monochromatic[i].toHexString()+"'>"+monochromatic[i].toHexString()+"</a>"
        monochromatic_hr.appendChild(h_td)
    }

    var complement = [c, c.complement()]

    complement_cr.innerHTML = ""
    complement_hr.innerHTML = ""

    for (var i = 0; i < complement.length; i++) {
        var c_td = document.createElement("td")
        c_td.style.backgroundColor = complement[i].toHexString()
        complement_cr.appendChild(c_td)

        var h_td = document.createElement("td")
        h_td.innerHTML = "<a href='"+complement[i].toHexString()+"'>"+complement[i].toHexString()+"</a>"
        complement_hr.appendChild(h_td)
    }

}

document.addEventListener("load", setup(), update(location.hash) )