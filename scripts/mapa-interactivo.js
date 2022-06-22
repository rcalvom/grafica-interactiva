/**
 * Archivo con el script del scketch de Phaser del mapa interactivo de Piltover.
 * Este script fue diseñado para el contenido del taller de la clase gráfica interactiva
 * de la Universidad Nacional de Colombia - Realizado por Ricardo Andrés Calvo
 */

/**
 * COMENTARIOS ADICIONALES:
 * - Se está utilizando la versión 3.15.1 de Phaser, la última estable a fecha de creación
 * de este scketch.
 * - La libreria de Phaser se está importando en la cabecera HTML del archivo mapa-interactivo.html
 * - Para poder acceder a los elementos HTML desde el scketch de Phaser se está retrazando la carga
 * de este scketch utilizando el parámetro "defer" (Ver linea 62 de "mapa-interactivo.html").
 * - Se creó una etiqueta p con la clase "mapa-interactivo" en "mapa-interactivo.html" para así colocar
 * dentro de el el canvas de Phaser.
 * - !!!! IMPORTANTE!!!! 
 * Cada vez que la página cambie de tamaño, se debe recargar la página para actualzar el responsive.
 */


/**
 * Declaramos variables "width" y "height" para calcular el ancho y alto del canvas
 */
var width = 0;
var height = 0;

/**
 * Declaramos variable fontsize para calcular el tamaño de las fuentes del mapa interactivo
 */
var fontsize = 0;

/**
 * Calculamos el valor de "width" y de "height" según el tamaño de la pantalla
 */
// Para pantallas pequeñas
if(document.documentElement.clientWidth >= 480 && document.documentElement.clientWidth <= 800){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientWidth;
    fontsize = 10;
}
// Para pantallas medianas
else if(document.documentElement.clientWidth > 800 && document.documentElement.clientWidth <= 1200){
    width = 3 * document.documentElement.clientWidth / 4;
    height = 3 * document.documentElement.clientWidth / 4;
    fontsize = 12;
}
// Para pantallas grandes
else if(document.documentElement.clientWidth > 1200){
    width = document.documentElement.clientWidth / 2;
    height = document.documentElement.clientWidth / 2;
    fontsize = 12;
}
// Se selecciona la altura como el 76% de la anchura, esto debido a que la imágen de fondo tiene esta relación de aspecto
height = 0.76 * width;

/**
 * Variable de configuración global del scketch de Phaser.
 */
var config = {
    // Se elige el tipo de scketch en automático, esto con el fin de adaptar la funcionalidad al
    // navegador del usuario. 
    type: Phaser.AUTO,
    // Se indica el ancho del scketch.
    width: width,
    // Se indica el alto del scketch, se añade el espacio para el área de detalle.
    height: height + height / 3,
    // Se indica el color de fondo del canvas, este es utilizado para el área de detalle.
    backgroundColor: "#40352c",
    // Se indica la etiqueta donde el canvas estará dentro, en este caso se utiliza la función
    // javascript getElementsByClassName y apartir de esta lista se obtiene el primer resultado con
    // el indice [0].
    parent: document.getElementsByClassName("mapa-interactivo")[0],
    // Indica el titulo del scketch, esta información se mostrará en la consola del navegador.
    title: "Mapa interactivo de Piltover",
    // Indica que se debe mostrar una información descriptiva en la consola del navegador.
    banner: true,
    // Indica la versión de este scketch
    version: "1.0.0",
    // Se indica la información de la escena, estas son las funciones que deben ser definidas
    // en Phaser
    scene: {
        // Función de precarga de recursos
        preload: preload,
        // Función de creación de escena
        create: create
    }
};

// Se crea el juego, es decir, se crea el canvas y se adjunta en el HTML de la página.
var game = new Phaser.Game(config);

/**
 * VARIABLES GLOBALES
 * Estas variables globales almacenarán información relevante del mapa durante su ejecución
 */
// Referencia al primer botón interactivo
var button1;
// Referencia al segundo botón interactivo
var button2;
// Referencia al tercer botón interactivo
var button3;
// Referencia al cuarto botón interactivo
var button4;
// Referencia al quinto botón interactivo
var button5;
// Referencia al sonido de botón
var sound;
// Referencia al texto del titulo del contenido
var title;
// Referencia al texto del contenido
var text;
// Referencia a la imágen del contenido
var image;

/**
 * Funcíón de precarga de recursos de phaser
 */
function preload (){
    // Se carga la imágen de fondo, es decirl, el mapa de Piltover como 'map'
    this.load.image('map', 'imagenes/mapa-de-piltover.jpg');
    // Se carga la imágen del botón no presionado como 'unpressed'
    this.load.image('unpressed', 'imagenes/boton-no-presionado.png');
    // Se carga la imágen del botón presionado como 'pressed'
    this.load.image('pressed', 'imagenes/boton-presionado.png');
    // Se carga la imágen de particula azul como 'particle'
    this.load.image('particle', 'imagenes/blue.png');
    // Se carga el audio correspondiente al presionar un botón interactivo
    this.load.audio('button', 'sonidos/boton.wav');
    // Se carga la imagen correspondiente al laboratorio de Heimmerdinger
    this.load.image("lab", 'imagenes/laboratorio-miniatura.jpg');
    // Se carga la imagen correspondiente al distrito de artes
    this.load.image("art", 'imagenes/arte-miniatura.jpg');
    // Se carga la imagen correspondiente a los carriles
    this.load.image("road", 'imagenes/carriles-miniatura.jpg');
    // Se carga la imagen correspondiente a los carriles
    this.load.image("police", 'imagenes/policia-miniatura.jpg');
    // Se carga la imagen correspondiente a los hexgates
    this.load.image("hexgate", 'imagenes/hexgates-miniatura.jpg');
}

/**
 * Función de creación de elementos en el canvas de phaser
 */
function create (){
    // Se añade el el mapa en el fondo del canvas
    var background = this.add.image(width/2, height/2, 'map');
    // Se redimenciona este mapa según el tamaño del canvas en la pantalla
    background.setScale(height / 1080);

    // Creamos el primer botón 'Laboratorio de Heimmerdinger'
    button1 = this.add.image(width/2, height/2, 'unpressed');
    // Añadimos el evento de click para el primer botón
    button1.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        clickButton(1);
    });
    // Creamos el segundo botón 'Distrito de Artes'
    button2 = this.add.image(0.45 * width, 0.4 * height, 'unpressed');
    // Añadimos el evento de click para el segundo botón
    button2.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        clickButton(2);
    });
    // Creamos el tercer botón 'Los Carriles'
    button3 = this.add.image(0.55 * width, 0.4 * height, 'unpressed');
    // Añadimos el evento de click para el tercer botón
    button3.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        clickButton(3);
    });
    // Creamos el cuarto botón 'Estación de policia'
    button4 = this.add.image(0.52 * width, 0.7 * height, 'unpressed');
    // Añadimos el evento de click para el cuarto botón
    button4.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        clickButton(4);
    });
    // Creamos el quinto botón 'Hexgates'
    button5 = this.add.image(0.32 * width, 0.35 * height, 'unpressed');
    // Añadimos el evento de click para el quinto botón
    button5.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
        clickButton(5);
    });

    // Se crea el objeto de Javascript relacionado con el sonido de presionar el botón
    sound = this.sound.add('button');

    // Se crea el objeto de Javascript relacionado con el Titulo del área de contenido
    title = this.add.text(0.4 * width, 1.05 * height, '', {
        color: "#000000",
        fontStyle: "bold",
        align: "center",
        fontSize: (fontsize * 1.2) + 'px'
    });

    // Se crea el objeto de Javascript relacionado con el texto del del área de contenido
    text = this.add.text(0.4 * width, 1.1 * height, '', {
        color: "#000000",
        fontSize: fontsize + 'px'
    });

    // Se crea el objeto de Javascript relacionado con la miniatura del área de contenido
    image = this.add.image(0.2 * width, 1.15 * height);
    image.setScale(1);

}
/**
 * Función que se ejecutará cada vez que un botón sea presionado
 * Aquí se actualizará el área de detalle con la información correspondiente
 * @param {number} index indice del botón presionado
 */
function clickButton(index){
    // Se ejecuta un sonido al momento de presionar el botón
    sound.play();
    // Estructura Switch para seleccionar que hacer al momento de presionar cada botón
    switch(index){
        case 1: {
            // Se actualizan las imágenes de los botones
            button1.setTexture('pressed');
            button2.setTexture('unpressed');
            button3.setTexture('unpressed');
            button4.setTexture('unpressed');
            button5.setTexture('unpressed');
            // Se actualiza el titulo del área de detalle
            title.setText("Laboratorio de Heimmerdinger");
            // Se actualiza el texto del área de contenido
            text.setText(
                "El laboratorio del profesor Heimmerdinger\n" +
                "se encuentra en la Universidad de Piltover.\n" +
                "Aquí el profesor se dedica a la fabricación\n" +
                "de torretas para defender la ciudad de los\n" + 
                "peligros que la acechan." 
            );
            // Se actualiza la textura de la imagen;
            image.setTexture('lab');
            break;
        }
        case 2: {
            // Se actualizan las imágenes de los botones
            button1.setTexture('unpressed');
            button2.setTexture('pressed');
            button3.setTexture('unpressed');
            button4.setTexture('unpressed');
            button5.setTexture('unpressed');
            // Se actualiza el titulo del área de detalle
            title.setText("Distrito de Artes");
            // Se actualiza el texto del área de contenido
            text.setText(
                "El distrito de artes es principalmente\n" +
                "un inmenso auditorio, donde los Piltovianos.\n" +
                "pueden disfrutar de increibles conciertos, \n" +
                "obras de teatro, conferencias. Sin duda es\n" + 
                "un lugar que debes visitar." 
            );
            // Se actualiza la textura de la imagen;
            image.setTexture('art');
            break;
        }
        case 3: {
            // Se actualizan las imágenes de los botones
            button1.setTexture('unpressed');
            button2.setTexture('unpressed');
            button3.setTexture('pressed');
            button4.setTexture('unpressed');
            button5.setTexture('unpressed');
            // Se actualiza el titulo del área de detalle
            title.setText("Los Carriles");
            // Se actualiza el texto del área de contenido
            text.setText(
                "Los carriles es el nombre que se le dá\n" +
                "a la principal entrada a Zaún desde Piltover.\n" +
                "Aquí los vigilantes de la ciudad se encargan de\n" +
                "vigirar todo el tiempo esta ruta para evitar\n" + 
                "acciones ilegales." 
            );
            // Se actualiza la textura de la imagen;
            image.setTexture('road');
            break;
        }
        case 4: {
            // Se actualizan las imágenes de los botones
            button1.setTexture('unpressed');
            button2.setTexture('unpressed');
            button3.setTexture('unpressed');
            button4.setTexture('pressed');
            button5.setTexture('unpressed');
            // Se actualiza el titulo del área de detalle
            title.setText("Estación de policia");
            // Se actualiza el texto del área de contenido
            text.setText(
                "La Estación de policia de Piltover es la\n" +
                "central de los vigilantes, estos están\n" +
                "liderados por la Sheriff Caitlyn, la cual con\n" +
                "su grán experiencia ha garantizado la\n" + 
                "seguridad entoda la ciudad." 
            );
            // Se actualiza la textura de la imagen;
            image.setTexture('police');
            break;
        }
        case 5: {
            // Se actualizan las imágenes de los botones
            button1.setTexture('unpressed');
            button2.setTexture('unpressed');
            button3.setTexture('unpressed');
            button4.setTexture('unpressed');
            button5.setTexture('pressed');
            // Se actualiza el titulo del área de detalle
            title.setText("Hexgates");
            // Se actualiza el texto del área de contenido
            text.setText(
                "Los Hexgates son el puerto aéreo de la ciudad, \n" +
                "con ayuda de la tecnología arcana desarrollada.\n" +
                "por el cientifico Jayce, estos portales permiten\n" +
                "transportar enormes cantidades de mercancia en \n" + 
                "Instantes, ¡es increible!" 
            );
            // Se actualiza la textura de la imagen;
            image.setTexture('hexgate');
            break;
        }
    }
}