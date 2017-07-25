//(function(){
 
var data;

var vitrine = document.getElementsByClassName("Vitrine");
var conteudo = document.querySelectorAll(".Vitrine-conteudo");
//console.log(conteudo);

function X(val){
    // elementos
    var link = conteudo[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0];
    var img = conteudo[0].getElementsByClassName('imagem')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
    var descricao = conteudo[0].getElementsByClassName('descricao')[0];
    var preco = conteudo[0].getElementsByClassName('preco')[0];
    var precoAnterior = conteudo[0].getElementsByClassName('precoAnterior')[0];
    var pagamento = conteudo[0].getElementsByClassName('pagamento')[0];
    // Recommendation
    val.data.recommendation.forEach(function(e,i){
//    console.log(conteudo);
        if (!conteudo[i]){
            var item = document.querySelectorAll(".item")[0];
//            console.log(item);
            var cln = item.cloneNode(true);
            conteudo[0].appendChild(cln);
            
        }
    
        // link    
        link.setAttribute("href", "http:" + e.detailUrl);
        // imagem
        img.setAttribute("src", "http:" + e.imageName);
        // descrição
        descricao.innerHTML = ""; // limpa
        descricao.append(e.name); // insere
        // Preço Anterior "De:"
        precoAnterior.innerHTML = ""; // limpa
        if(e.oldPrice){
            precoAnterior.insertAdjacentHTML('afterbegin',"<span>De:</span> "+e.oldPrice);
        }
        // preço "Por:"
        preco.innerHTML = "";   // limpa
        preco.insertAdjacentHTML('afterbegin',"<span>Por:</span> "+e.price);  // insere // insere
        // Formas de Pagamento
        pagamento.innerHTML = ""; //limpa
        pagamento.insertAdjacentHTML('afterbegin',e.productInfo.paymentConditions); // insere


    });

}

$(document).ready(function () {

    var vitrineConteudo = document.getElementsByClassName('Vitrine-conteudo');
    var itemLargura = "";
    var anterior = document.getElementsByClassName('anterior')[0];
    var proximo = document.getElementsByClassName('proximo')[0];
    // <<- 
    anterior.addEventListener("click", function(n,e){
        click(0, this); 
    });
    // ->>
    proximo.addEventListener("click", function(n,e){
        click(1, this);
    });

    CalculaTamanho();

    window.addEventListener('resize', function(event) {
        CalculaTamanho();
    });


    // Essa função define o tamanho dos itens
    function CalculaTamanho() {
        var itensTela = 0;
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';

        var TamanhoComBorda = vitrine[0].offsetWidth;
        // classe de bloqueio do botão
        var className = "over";
        
        var bodyWidth = document.body.offsetWidth;
        var conteudoLista = Array.prototype.slice.call(conteudo);

        conteudoLista.forEach(function(e){

            id = id + 1;
            var qtdeItens = e.children.length;

            // elementos proximos ao botão
            btnParentSb = e.parentElement.getAttribute("data-items");;

            itemsSplit = btnParentSb.split(',');
            e.parentElement.setAttribute("id", "Vitrine" + id);

            if (bodyWidth >= 1200) {
                itensTela = itemsSplit[3];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else if (bodyWidth >= 992) {
                itensTela = itemsSplit[2];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else if (bodyWidth >= 768) {
                itensTela = itemsSplit[1];
                itemLargura = TamanhoComBorda / itensTela;
            }
            else {
                itensTela = itemsSplit[0];
                itemLargura = TamanhoComBorda / itensTela;
            }
           // ajusta o tamanho do coteudo da vitrine
           e.style.transform = "translateX(0px)";
           e.style.width = (itemLargura * qtdeItens)+"px";

           // reajustando o tamanho dos itens 
           for (var j = 0; j < qtdeItens; j++){
                conteudo[0].children[j].style.width = itemLargura+"px";
            }

           // Verifica se está encostado do lado esquerdo
            if (anterior.classList)
                anterior.classList.add(className)
            else 
                anterior.classList.remove(className)
            // Verifica se está encostado do lado direito
            if (proximo.classList)
                proximo.classList.remove(className)
            else 
                proximo.classList.add(className)

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.anterior');
        var rightBtn = ('.proximo');
        var translateXval = '';
        var divStyle = $(el + ' ' + vitrineConteudo).css('transform');
     
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemLargura * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemLargura / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(vitrineConteudo).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemLargura * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemLargura / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + vitrineConteudo).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});