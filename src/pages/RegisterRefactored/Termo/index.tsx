import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog({ setAcceptTerms }: { setAcceptTerms: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    function handleClose(accept: string) {
        if (accept === 'accept') {
            setAcceptTerms(true);
            console.log('accepted');
        } else {
            console.log('rejected');
        }
        setOpen(false);
    }

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div style={{
            marginTop: '3%',
        }}>
            <Button onClick={handleClickOpen('paper')}>Termos de Uso</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Termos de Uso</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('reject')}>Recusar</Button>
                    <Button onClick={() => handleClose('accept')}>Aceitar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


// eslint-disable-next-line
export const text = `Termos e condi????es de uso do site ou blog
Seja bem-vindo ao nosso site. Leia com aten????o todos os termos abaixo.
Este documento, e todo o conte??do do site ?? oferecido por (ADICIONAR DADOS DA EMPRESA OU NOME FANTASIA), neste termo representado apenas por ???EMPRESA???, que regulamenta todos os direitos e obriga????es com todos que acessam o site, denominado neste termo como ???VISITANTE???, reguardado todos os direitos previstos na legisla????o, trazem as cl??usulas abaixo como requisito para acesso e visita do mesmo, situado no endere??o (ADICIONAR ENDERE??O DO SITE).
A perman??ncia no website implica-se automaticamente na leitura e aceita????o t??cita do presente termos de uso a seguir. Este termo foi atualizado pela ??ltima vez em 14 de setembro de 2021.
1. DA FUN????O DO SITE
Este site foi criado e desenvolvido com a fun????o de trazer conte??do informativo de alta qualidade, a venda de produtos f??sicos, digitais e a divulga????o de presta????o de servi??o. A EMPRESA busca atrav??s da cria????o de conte??do de alta qualidade, desenvolvido por profissionais da ??rea, trazer o conhecimento ao alcance de todos, assim como a divulga????o dos pr??prios servi??os.
Nesta plataforma, poder?? ser realizado tanto a divulga????o de material original de alta qualidade, assim como a divulga????o de produtos de e-commerce.
Todo o conte??do presente neste site foi desenvolvido buscando fontes e materiais de confiabilidade, assim como s??o baseados em estudos s??rios e respeitados, atrav??s de pesquisa de alta n??vel.
Todo o conte??do ?? atualizado periodicamente, por??m, pode conter em algum artigo, v??deo ou imagem, alguma informa????o que n??o reflita a verdade atual, n??o podendo a EMPRESA ser responsabilizada de nenhuma forma ou meio por qualquer conte??do que n??o esteja devidamente atualizado.
?? de responsabilidade do usu??rio de usar todas as informa????es presentes no site com senso cr??tico, utilizando apenas como fonte de informa????o, e sempre buscando especialistas da ??rea para a solu????o concreta do seu conflito.
2. DO ACEITE DOS TERMOS
Este documento, chamado ???Termos de Uso???, aplic??veis a todos os visitantes do site, foi desenvolvido por Diego Castro Advogado ??? OAB/PI 15.613, modificado com permiss??o para este site.
Este termo especifica e exige que todo usu??rio ao acessar o site da EMPRESA, leia e compreenda todas as cl??usulas do mesmo, visto que ele estabelece entre a EMPRESA e o VISITANTE direitos e obriga????es entre ambas as partes, aceitos expressamente pelo VISITANTE a permanecer navegando no site da EMPRESA.
Ao continuar acessando o site, o VISITANTE expressa que aceita e entende todas as cl??usulas, assim como concorda integralmente com cada uma delas, sendo este aceite imprescind??vel para a perman??ncia na mesma. Caso o VISITANTE discorde de alguma cl??usula ou termo deste contrato, o mesmo deve imediatamente interromper sua navega????o de todas as formas e meios.
Este termo pode e ir?? ser atualizado periodicamente pela EMPRESA, que se resguarda no direito de altera????o, sem qualquer tipo de aviso pr??vio e comunica????o. ?? importante que o VISITANTE confira sempre se houve movimenta????o e qual foi a ??ltima atualiza????o do mesmo no come??o da p??gina.
3. DO GLOSS??RIO
Este termo pode conter algumas palavras espec??ficas que podem n??o se de conhecimento geral. Entre elas:
VISITANTE: Todo e qualquer usu??rio do site, de qualquer forma e meio, que acesse atrav??s de computador, notebook, tablet, celular ou quaisquer outros meios, o website ou plataforma da empresa.
NAVEGA????O: O ato de visitar p??ginas e conte??do do website ou plataforma da empresa.
COOKIES: Pequenos arquivos de textos gerados automaticamente pelo site e transmitido para o navegador do visitante, que servem para melhorar a usabilidade do visitante.
LOGIN: Dados de acesso do visitante ao realizar o cadastro junto a EMPRESA, dividido entre usu??rio e senha, que d?? acesso a fun????es restritas do site.
HIPERLINKS: S??o links clic??veis que podem aparecer pelo site ou no conte??do, que levam para outra p??gina da EMPRESA ou site externo.
OFFLINE: Quando o site ou plataforma se encontra indispon??vel, n??o podendo ser acessado externamente por nenhum usu??rio.
Em caso de d??vidas sobre qualquer palavra utilizada neste termo, o VISITANTE dever?? entrar em contato com a EMPRESA atrav??s dos canais de comunica????o encontradas no site.
4. DO ACESSO AO SITE
O Site e plataforma funcionam normalmente 24 (vinte e quatro) horas por dia, por??m podem ocorrer pequenas interrup????es de forma tempor??ria para ajustes, manuten????o, mudan??a de servidores, falhas t??cnicas ou por ordem de for??a maior, que podem deixar o site indispon??vel por tempo limitado.
A EMPRESA n??o se responsabiliza por nenhuma perda de oportunidade ou preju??zos que esta indisponibilidade tempor??ria possa gerar aos usu??rios.
Em caso de manuten????o que exigirem um tempo maior, a EMPRESA ir?? informar previamente aos clientes da necessidade e do tempo previsto em que o site ou plataforma ficar?? offline.
O acesso ao site s?? ?? permitido a maiores de 18 anos de idade ou que possu??rem capacidade civil plena. Para acesso de menores de idade, ?? necess??ria a expressa autoriza????o dos pais ou tutores, ficando o mesmo respons??veis sobre qualquer compra ou acesso efetuados pelo mesmo.
Caso seja necess??rio realizar um cadastro junto a plataforma, onde o VISITANTE dever?? preencher um formul??rio com seus dados e informa????es, para ter acesso a alguma parte restrita, ou realizar alguma compra.
Todos os dados est??o protegidos conforme a Lei Geral de Prote????o de Dados, e ao realizar o cadastro junto ao site, o VISITANTE concorda integralmente com a coleta de dados conforme a Lei e com a Pol??tica de Privacidade da EMPRESA.
5. DA LICEN??A DE USO E C??PIA
O visitante poder?? acessar todo o conte??do do website, como artigos, v??deos, imagens, produtos e servi??os, n??o significando nenhum tipo de cess??o de direito ou permiss??o de uso, ou de c??pia dos mesmo.
Todos os direitos s??o preservados, conforme a legisla????o brasileira, principalmente na Lei de Direitos Autorais (regulamentada na Lei n?? 9.610/18), assim como no C??digo Civil brasileiro (regulamentada na Lei n?? 10.406/02), ou quaisquer outras legisla????es aplic??veis.
Todo o conte??do do site ?? protegido por direitos autorais, e seu uso, c??pia, transmiss??o, venda, cess??o ou revenda, deve seguir a lei brasileira, tendo a EMPRESA todos os seus direitos reservados, e n??o permitindo a c??pia ou utiliza????o de nenhuma forma e meio, sem autoriza????o expressa e por escrita da mesma.
A EMPRESA poder?? em casos concretos permitir pontualmente exce????es a este direito, que ser??o claramente destacados no mesmo, com a forma e permiss??o de uso do conte??do protegido. Este direito ?? revog??vel e limitado as especifica????es de cada caso.
6. DAS OBRIGA????ES
O VISITANTE ao utilizar o website da EMPRESA, concorda integralmente em:
De nenhuma forma ou meio realizar qualquer tipo de a????o que tente invadir, hacker, destruir ou prejudicar a estrutura do site, plataforma da EMPRESA ou de seus parceiros comerciais. Incluindo-se, mas n??o se limitando, ao envio de v??rus de computador, de ataques de DDOS, de acesso indevido por falhas da mesma ou quaisquer outras forma e meio.
De n??o realizar divulga????o indevida nos coment??rios do site de conte??do de SPAM, empresas concorrentes, v??rus, conte??do que n??o possua direitos autorais ou quaisquer outros que n??o seja pertinente a discuss??o daquele texto, v??deo ou imagem.
Da proibi????o em reproduzir qualquer conte??do do site ou plataforma sem autoriza????o expressa, podendo responder civil e criminalmente pelo mesmo.
Com a Pol??tica de Privacidade do site, assim como tratamos os dados referentes ao cadastro e visita no site, podendo a qualquer momento e forma, requerer a exclus??o dos mesmos, atrav??s do formul??rio de contato.
7. DA MONETIZA????O E PUBLICIDAD
A EMPRESA pode alugar ou vender espa??os publicit??rios na plataforma, ou no site, diretamente aos anunciantes, ou atrav??s de empresas especializadas com o Adsense (Google), Taboola ou outras plataformas especializadas como o EletroCriticas.com
Essas publicidades n??o significam nenhuma forma de endosso ou responsabilidade pelos mesmos, ficando o VISITANTE respons??vel pelas compras, visitas, acessos ou quaisquer a????es referentes as estas empresas.
Todas as propagandas no site ou plataforma ser??o claramente destacadas como publicidade, como forma de disclaimer da EMPRESA e de conhecimento do VISITANTE.
Em casos de compra de produtos ou servi??os, ser?? poss??vel a devolu????o em at?? 07 (sete) dias, conforme o C??digo de Defesa do Consumidor.
Estes an??ncios podem ser selecionados pela empresa de publicidade automaticamente, conforme as visitas recentes do VISITANTE, assim como baseado no seu hist??rico de busca, conforme as pol??ticas de acesso da plataforma.
8. DOS TERMOS GERAIS
O Site ir?? apresentar hiperlinks durante toda a sua navega????o, que podem levar diretamente para outra p??gina da EMPRESA ou para sites externos.
Apesar da EMPRESA apenas criar links para sites externos de extrema confian??a, caso o usu??rio acesse um site externo, a EMPRESA n??o tem nenhuma responsabilidade pelo meio, sendo uma mera indica????o de complementa????o de conte??do, ficando o mesmo respons??vel pelo acesso, assim como sobre quaisquer a????es que venham a realizar neste site.
Em caso que ocorra eventuais conflitos judiciais entre o VISITANTE e a EMPRESA, o foro elegido para a devida a????o ser?? o da comarca da Empresa, mesmo que haja outro mais privilegiado.
Este Termo de uso ?? valido a partir de 14 de setembro de 2021.`;