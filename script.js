const limparBusca = () => {
  document.getElementById("busca").value = "";
  document.getElementById("mensagem-busca").textContent = "";

  document.querySelectorAll(".category").forEach((cat) => {
    const ul = cat.querySelector("ul");
    ul.classList.remove("ativa");
    cat.style.display = "block";

    ul.querySelectorAll("li").forEach((li) => {
      li.innerHTML = li.textContent;
      li.style.display = "list-item";
    });
  });

  // Também esconde sub-itens
  document.querySelectorAll(".sub-itens").forEach((ul) => {
    ul.classList.remove("mostrar");
  });
};

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/s\b/, "");

const filtrarTermos = () => {
  const termoOriginal = document.getElementById("busca").value.trim();
  const mensagemBusca = document.getElementById("mensagem-busca");

  if (termoOriginal === "") {
    limparBusca();
    return;
  }

  const termoNormalizado = normalizar(termoOriginal);
  let encontrouGeral = false;

  document.querySelectorAll(".category").forEach((cat) => {
    const ul = cat.querySelector("ul");
    let encontrou = false;

    ul.querySelectorAll("li").forEach((li) => {
      const textoOriginal = li.textContent.trim();
      const textoNormalizado = normalizar(textoOriginal);
      const regex = new RegExp(`\\b${termoNormalizado}`, "i");

      if (regex.test(textoNormalizado)) {
        const textoComDestaque = textoOriginal.replace(
          new RegExp(`\\b(${termoOriginal})`, "gi"),
          `<span class="highlight">$1</span>`
        );
        li.innerHTML = textoComDestaque;
        li.style.display = "list-item";

        // Expande subcategoria automaticamente
        const subItens = li.closest(".sub-itens");
        if (subItens) {
          subItens.classList.add("mostrar");
        }

        encontrou = true;
      } else {
        li.innerHTML = textoOriginal;
        li.style.display = "none";
      }
    });

    ul.classList.toggle("ativa", encontrou);
    cat.style.display = encontrou ? "block" : "none";

    if (encontrou) encontrouGeral = true;
  });

  mensagemBusca.textContent = encontrouGeral ? "" : "Não Encontrado";
};

document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("DOMContentLoaded", () => {
  // ...código existente...

  const form = document.getElementById("formFeedback");
  const resposta = document.getElementById("respostaFeedback");

  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    resposta.textContent = "⏳ Enviando...";
    resposta.style.color = "#cbd5e1";

    const data = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    }).then((response) => {
      if (response.ok) {
        resposta.textContent = "✅ Obrigado pelo seu feedback!";
        resposta.style.color = "#22c55e";
        form.reset();
      } else {
        resposta.textContent = "❌ Erro ao enviar. Tente novamente.";
        resposta.style.color = "#f87171";
      }
    });
  });
});

  // Busca ao digitar
  document.getElementById("busca").addEventListener("input", filtrarTermos);

  // Toggle de categorias principais
  document.querySelectorAll(".category h2").forEach((titulo) => {
    titulo.addEventListener("click", () => {
      const section = titulo.parentElement;
      section.classList.toggle("active");
    });
  });

  // Toggle de subcategorias
  document.querySelectorAll(".subtitulo").forEach((el) => {
    el.addEventListener("click", () => {
      const proximo = el.nextElementSibling;
      if (proximo && proximo.classList.contains("sub-itens")) {
        proximo.classList.toggle("mostrar");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // ...código existente...

  // Formulário de feedback
  const form = document.getElementById("formFeedback");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const resposta = document.getElementById("respostaFeedback");
    resposta.textContent = "✅ Obrigado pelo seu feedback!";
    resposta.style.color = "#22c55e";
    form.reset();
  });
});


function capitalizarPrimeiraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function atualizarDataHora() {
  const agora = new Date();
  const opcoesData = {
    weekday: 'long',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  };
  const data = agora.toLocaleDateString('pt-BR', opcoesData);
  const partes = data.split(', ');
  const diaSemana = capitalizarPrimeiraLetra(partes[0]);
  const dataFormatada = `${diaSemana}, ${partes[1]}`;

  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('data-hora').textContent = `📟 ${dataFormatada} - ${hora}`;
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarDataHora();
  setInterval(atualizarDataHora, 1000);
});