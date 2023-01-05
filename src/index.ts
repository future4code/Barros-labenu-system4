import { app } from './app';
import { criarTurma } from './endpoints/criarTurma';
import { addDocente } from './endpoints/adicionarDocente';
import { Usuario } from './class/usuario';
import { alterarModulo } from './endpoints/alterarModuloTurma';
import { addEstudante } from './endpoints/adicionarEstudante';
import { turmasAtivas } from './endpoints/tumasAtivas';
import { buscaEstudante } from './endpoints/buscaEstudante';
import { buscaDocente } from './endpoints/buscarDocentes';
import { buscaTurmas } from './endpoints/buscarTurmas';
import { alterarEstudanteTurma } from './endpoints/alterarEstudanteTurma';
import { alterarDocenteTurma } from './endpoints/alterarDocenteTurma';
import { deleteEstudante } from './endpoints/deleteEstudantes';





app.get('/labesystem/turmasAtivas', turmasAtivas ) // Busca as turmas ativas
app.get('/labesystem/estudante/:nome', buscaEstudante ) // Busca aluno pelo nome
app.get('/labesystem/docente', buscaDocente ) // Busca todos os Docentes
app.get('/labesystem/turmas', buscaTurmas ) // Busca todos os Turmas

app.post('/labesystem/turma', criarTurma) // Adicionar Turma
app.post('/labesystem/docente', addDocente) // Adicionar Docente
app.post('/labesystem/estudante', addEstudante) // Adicionar Estudante

app.patch('/labesystem/turma/:id', alterarModulo ) // Altera o modulo da turma
app.patch('/labesystem/estudante/:id', alterarEstudanteTurma ) // Altera o turma do Estudante
app.patch('/labesystem/docente/:id', alterarDocenteTurma ) // Altera o docente do Estudante

app.delete('/labesystem/estudante/:id', deleteEstudante ) // remover estudante
console.log(new Date().toISOString().slice(0,10))