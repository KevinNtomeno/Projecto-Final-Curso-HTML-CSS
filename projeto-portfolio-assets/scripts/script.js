const botaoTema=document.getElementById('botao-tema');
const temaSalvo=localStorage.getItem('portfolio-tema');
if(temaSalvo==='dark')document.body.classList.add('dark');
botaoTema?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('portfolio-tema',document.body.classList.contains('dark')?'dark':'light')});
