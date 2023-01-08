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





app.get('/labesystem/turmasAtivas', turmasAtivas ) // Busca as turmas ativas --- CONCLUIDO
app.get('/labesystem/estudante/:nome', buscaEstudante ) // Busca aluno pelo nome --- CONCLUIDO
app.get('/labesystem/docente', buscaDocente ) // Busca todos os Docentes --- CONCLUIDO
app.get('/labesystem/turmas', buscaTurmas ) // Busca todos os Turmas --- CONCLUIDO

app.post('/labesystem/turma', criarTurma) // Adicionar Turma --- CONCLUIDO
app.post('/labesystem/docente', addDocente) // Adicionar Docente --- CONCLUIDO
app.post('/labesystem/estudante', addEstudante) // Adicionar Estudante --- CONCLUIDO

app.patch('/labesystem/turma/:id', alterarModulo ) // Altera o modulo da turma --- CONCLUIDO
app.patch('/labesystem/estudante/:estudanteId', alterarEstudanteTurma ) // Altera a turma do Estudante --- CONCLUIDO
app.patch('/labesystem/docente/:docenteId', alterarDocenteTurma ) // Altera a turma do docente --- CONCLUIDO

app.delete('/labesystem/estudante/:id', deleteEstudante ) // remover estudante --- CONCLUIDO
console.log(new Date().toISOString().slice(0,10))