// ============================================
// TASKFLOW - SERVIDOR COMPLETO COM ROTAS REST
// ============================================

require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variáveis de ambiente
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'TaskFlow';

// ============================================
// DADOS EM MEMÓRIA (Array de Tarefas)
// ============================================

let tasks = [
  {
    id: 1,
    title: 'Aprender Node.js',
    description: 'Estudiar Express, MongoDB e as rotas REST',
    priority: 'alta',
    completed: true,
    createdAt: new Date('2026-03-01')
  },
  {
    id: 2,
    title: 'Dominar Express',
    description: 'Aprender sobre middlewares e rotas',
    priority: 'alta',
    completed: false,
    createdAt: new Date('2026-03-15')
  },
  {
    id: 3,
    title: 'Integrar MongoDB',
    description: 'Conectar banco de dados ao projeto',
    priority: 'média',
    completed: false,
    createdAt: new Date('2026-03-25')
  }
];

// ============================================
// FUNÇÃO AUXILIAR: LOG
// ============================================

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] [${APP_NAME}] ${message}`);
}

// ============================================
// ROTAS REST API
// ============================================

// ===== POST - CRIAR TAREFA =====
app.post('/api/tasks', (req, res) => {
  log('POST /api/tasks - Criando nova tarefa');
  
  const { title, description, priority, completed } = req.body;

  // Validação
  if (!title) {
    log('❌ Erro: Title obrigatório');
    return res.status(400).json({
      error: 'Title é obrigatório',
      mensagem: 'Você precisa enviar um "title"'
    });
  }

  // Criar nova tarefa
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description: description || '',
    priority: priority || 'normal',
    completed: completed || false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  log(`✅ Tarefa criada: ${title} (ID: ${newTask.id})`);

  res.status(201).json({
    mensagem: 'Tarefa criada com sucesso',
    tarefa: newTask
  });
});

// ===== GET - LISTAR TODAS AS TAREFAS =====
app.get('/api/tasks', (req, res) => {
  log('GET /api/tasks - Listando todas as tarefas');

  res.json({
    mensagem: 'Tarefas listadas',
    total: tasks.length,
    tarefas: tasks
  });
});

// ===== GET - BUSCAR TAREFA POR ID =====
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  log(`GET /api/tasks/${id} - Buscando tarefa por ID`);

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    log(`❌ Tarefa ${id} não encontrada`);
    return res.status(404).json({
      error: 'Tarefa não encontrada',
      id: parseInt(id)
    });
  }

  res.json({
    mensagem: 'Tarefa encontrada',
    tarefa: task
  });
});

// ===== PUT - ATUALIZAR TAREFA =====
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;
  
  log(`PUT /api/tasks/${id} - Atualizando tarefa`);

  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) {
    log(`❌ Tarefa ${id} não encontrada para atualizar`);
    return res.status(404).json({
      error: 'Tarefa não encontrada',
      id: parseInt(id)
    });
  }

  // Atualizar apenas os campos fornecidos
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (completed !== undefined) task.completed = completed;

  task.updatedAt = new Date();

  log(`✅ Tarefa ${id} atualizada: ${task.title}`);

  res.json({
    mensagem: 'Tarefa atualizada com sucesso',
    tarefa: task
  });
});

// ===== DELETE - DELETAR TAREFA =====
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  log(`DELETE /api/tasks/${id} - Deletando tarefa`);

  const index = tasks.findIndex(t => t.id === parseInt(id));

  if (index === -1) {
    log(`❌ Tarefa ${id} não encontrada para deletar`);
    return res.status(404).json({
      error: 'Tarefa não encontrada',
      id: parseInt(id)
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  log(`✅ Tarefa ${id} deletada: ${deletedTask.title}`);

  res.json({
    mensagem: 'Tarefa deletada com sucesso',
    tarefa: deletedTask
  });
});

// ============================================
// ROTAS ADICIONAIS
// ============================================

// ===== GET - PÁGINA INICIAL =====
app.get('/', (req, res) => {
  log('GET / - Acessando página inicial');
  
  res.json({
    mensagem: 'Bem-vindo ao TaskFlow',
    versao: '1.0.0',
    endpoints: {
      criar_tarefa: 'POST /api/tasks',
      listar_tarefas: 'GET /api/tasks',
      obter_tarefa: 'GET /api/tasks/:id',
      atualizar_tarefa: 'PUT /api/tasks/:id',
      deletar_tarefa: 'DELETE /api/tasks/:id'
    }
  });
});

// ===== GET - SOBRE =====
app.get('/about', (req, res) => {
  log('GET /about - Acessando sobre');
  
  res.json({
    nome: 'TaskFlow',
    descricao: 'Gerenciador de tarefas com Node.js e Express',
    versao: '1.0.0',
    autor: 'Seu Nome',
    tecnologias: ['Node.js', 'Express', 'JSON']
  });
});

// ===== GET - ESTATÍSTICAS =====
app.get('/api/stats', (req, res) => {
  log('GET /api/stats - Obtendo estatísticas');
  
  const stats = {
    total: tasks.length,
    concluidas: tasks.filter(t => t.completed).length,
    pendentes: tasks.filter(t => !t.completed).length,
    alta_prioridade: tasks.filter(t => t.priority === 'alta').length,
    media_prioridade: tasks.filter(t => t.priority === 'média').length,
    normal_prioridade: tasks.filter(t => t.priority === 'normal').length
  };

  res.json({
    mensagem: 'Estatísticas das tarefas',
    estatisticas: stats
  });
});

// ============================================
// TRATAMENTO DE ERROS
// ============================================

// Rota 404 - Não encontrada
app.use((req, res) => {
  log(`❌ 404 - Rota não encontrada: ${req.method} ${req.url}`);
  
  res.status(404).json({
    error: 'Rota não encontrada',
    metodo: req.method,
    url: req.url,
    dica: 'Acesse GET / para ver os endpoints disponíveis'
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  log('================================================');
  log(`🚀 Servidor iniciado com sucesso!`);
  log(`📍 Acesse: http://localhost:${PORT}`);
  log(`🌐 API: http://localhost:${PORT}/api/tasks`);
  log(`ℹ️  Sobre: http://localhost:${PORT}/about`);
  log(`📊 Stats: http://localhost:${PORT}/api/stats`);
  log('================================================');
});