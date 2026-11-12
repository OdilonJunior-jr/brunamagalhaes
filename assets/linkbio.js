(()=>{
  'use strict';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion=window.gsap;
  if(motion&&!reduced){
    motion.timeline({defaults:{ease:'power2.out',clearProps:'transform,opacity'}})
      .from('.brand-lockup',{y:10,opacity:0,duration:.5})
      .from('.portrait-ring',{y:12,opacity:0,scale:.94,duration:.65},'-.3')
      .from('.intro,.welcome-copy,.location',{y:10,opacity:0,duration:.5,stagger:.07},'-.35')
      .from('.links>a,.links>button',{y:14,opacity:0,duration:.55,stagger:.1},'-.25')
      .from('.instagram,footer',{opacity:0,duration:.5},'-.2');
    document.querySelectorAll('.links>a,.links>button').forEach(card=>{
      card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')motion.to(card,{y:-3,duration:.22,ease:'power2.out'});});
      card.addEventListener('pointerleave',()=>motion.to(card,{y:0,duration:.22,ease:'power2.out'}));
    });
  }
  const cfg=window.BRUNA_CONFIG||{};
  const instagram=cfg.instagram||'https://www.instagram.com/psi.brunamagalhaes/';
  const number=String(cfg.whatsapp||'').replace(/\D/g,'');
  const valid=/^55[1-9][0-9][0-9]{8,9}$/.test(number);
  const contact=valid?'https://wa.me/'+number+'?text='+encodeURIComponent(cfg.mensagem||'Olá, Bruna! Gostaria de saber mais sobre o atendimento.'):instagram;
  document.querySelectorAll('[data-contact]').forEach(a=>{a.href=contact;a.setAttribute('aria-label',valid?'Conversar com Bruna pelo WhatsApp (abre em nova aba)':'Conversar com Bruna pelo Instagram (abre em nova aba)');});
  document.querySelectorAll('[data-contact-label]').forEach(label=>label.textContent=valid?'Tire suas dúvidas pelo WhatsApp.':'Tire suas dúvidas pelo Instagram.');
  document.querySelectorAll('[data-instagram]').forEach(a=>a.href=instagram);
  if(cfg.crp)document.getElementById('crpDisplay').textContent='CRP '+cfg.crp;
  const info={
    sobre:{title:'Prazer, Bruna.',text:'Sou Bruna Magalhães, psicóloga. Acredito na importância de um espaço de escuta, respeito e acolhimento para cada história. Atendo online e presencialmente em Uberaba, MG, com respeito à sua singularidade e ao seu tempo.'},
    online:{title:'Atendimento online',text:'Um espaço de escuta à distância, com flexibilidade para a sua rotina. Entre em contato para conhecer a modalidade e os horários disponíveis.'},
    presencial:{title:'Presencial em Uberaba',text:'Atendimento psicológico presencial em Uberaba, MG. Converse comigo para confirmar o endereço, os horários e os próximos passos.'}
  };
  const backdrop=document.getElementById('modalBackdrop'),close=document.getElementById('modalClose'),main=document.querySelector('main');
  let previous;
  function dismiss(){backdrop.hidden=true;main.inert=false;document.body.classList.remove('modal-open');previous?.focus();}
  document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>{
    const item=info[button.dataset.modal];if(!item)return;
    previous=button;document.getElementById('modalTitle').textContent=item.title;document.getElementById('modalText').textContent=item.text;
    backdrop.hidden=false;main.inert=true;document.body.classList.add('modal-open');close.focus();
    if(motion&&!reduced)motion.fromTo(backdrop.querySelector('.dialog'),{y:12,opacity:0,scale:.98},{y:0,opacity:1,scale:1,duration:.28,ease:'power2.out',clearProps:'transform,opacity'});
  }));
  close.addEventListener('click',dismiss);
  backdrop.addEventListener('click',event=>{if(event.target===backdrop)dismiss();});
  document.addEventListener('keydown',event=>{
    if(backdrop.hidden)return;
    if(event.key==='Escape')dismiss();
    if(event.key==='Tab'){
      const last=backdrop.querySelector('a');
      if(event.shiftKey&&document.activeElement===close){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();close.focus();}
    }
  });
})();
