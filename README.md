# Aspiradora virtual "inteligente"

![This is a alt text.](/img/aspiradora-main.png "This is a sample image.")

El proyecto trata sobre la simulación de un agente inteligente, en este caso una aspiradora.

La idea es que se genere una matriz de suciedad, es decir el área a limpiar, y esta tendrá niveles de suciedad.

Los niveles de suciedad son los siguientes:

- A = Nivel de suciedad alta <span style="color:#402905"> *** </span>.
- B = Nivel de suciedad media <span style="color:#76552b"> *** </span>.
- C = Nivel de suciedad baja <span style="color:#b69f66"> *** </span>.
- D = Sin suciedad <span style="color:white"> *** </span>.

El algoritmo de la aspiradora limpia de acuerdo al nivel de suciedad y buscando la ruta más corta hacía el mismo.Primera busca los de nivel A, luego B y luego C.

Los pasos recorridos se muestran en la parte de rutas donde se describe las direcciones en las que se movió.

La matriz que se genera es de un tamaño de NxN, donde N<=10 y N>=4.

Tecnologías utilizadas: 

- Vanilla Javascript
- CSS3
- HTML5
