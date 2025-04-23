'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Branch {
  id: string;
  name: string;
  commits: Commit[];
  parent?: string;
  color: string;
}

interface Commit {
  id: string;
  message: string;
  timestamp: Date;
  type?: 'feature' | 'bugfix' | 'hotfix';
}

interface Task {
  id: number;
  description: string;
  completed: boolean;
  hint?: string;
}

interface ActionExplanation {
  title: string;
  description: string;
  example?: string;
  bullets?: string[];
}

interface SimulationStep {
  action: 'branch' | 'commit';
  name?: string;
  from?: string;
  branch?: string;
  message?: string;
  type?: 'feature' | 'bugfix' | 'hotfix';
}

export default function GitBranches() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'main-initial',
      name: 'main',
      color: '#22c55e',
      commits: [
        {
          id: 'initial',
          message: 'Initial commit',
          timestamp: new Date()
        }
      ]
    }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: "Créez une branche 'feature/header' depuis main",
      completed: false,
      hint: "Cette branche servira à développer le header de l'application"
    },
    {
      id: 2,
      description: "Ajoutez un commit sur la branche feature/header",
      completed: false,
      hint: "Par exemple: 'Add navigation menu'"
    },
    {
      id: 3,
      description: "Mergez la branche feature/header dans main",
      completed: false,
      hint: "Une fois la fonctionnalité terminée, on la fusionne dans main"
    }
  ]);

  const [newBranchName, setNewBranchName] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('');
  const [commitType, setCommitType] = useState<'feature' | 'bugfix' | 'hotfix'>('feature');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  const branchColors = ['#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#f97316'];

  const explanations: Record<string, ActionExplanation> = {
    branch: {
      title: "🌿 Création d'une branche",
      description: "Une branche permet de travailler sur une fonctionnalité sans affecter le code principal.",
      example: "Exemple: feature/header pour développer l'en-tête du site"
    },
    commit: {
      title: "📝 Création d'un commit",
      description: "Un commit enregistre vos modifications à un instant T. Pensez à sélectionner la bonne branche avant de commiter !",
      example: "Exemple: 'Add navigation menu' sur la branche feature/header"
    },
    merge: {
      title: "🔄 Fusion (merge)",
      description: "Le merge permet d'intégrer les modifications d'une branche dans une autre.",
      example: "Une fois la fonctionnalité terminée, on merge feature/header dans main"
    },
    devops: {
      title: "👨‍💻 Le rôle du DevOps sur Git",
      description: "Le DevOps est comme le chef d'orchestre entre les développeurs et la production. Sur Git, il :",
      bullets: [
        "Configure GitLab/GitHub pour sécuriser le code",
        "Met en place des tests automatiques avec Jenkins/GitLab CI",
        "Automatise le déploiement vers le cloud"
      ],
      example: "Un développeur push son code → GitLab CI lance les tests → ArgoCD déploie automatiquement"
    }
  };

  const createBranch = () => {
    if (!newBranchName.trim()) {
      setError('Le nom de la branche est requis');
      return;
    }
    if (branches.some(b => b.name === newBranchName)) {
      setError('Cette branche existe déjà');
      return;
    }

    const newBranch: Branch = {
      id: `${newBranchName}-${Date.now()}`,
      name: newBranchName,
      color: branchColors[branches.length % branchColors.length],
      commits: [],
      parent: selectedBranch
    };

    setBranches(prev => [...prev, newBranch]);
    setNewBranchName('');
    setError('');
    setSuccess(`✨ Branche ${newBranchName} créée avec succès !`);
    
    if (newBranchName === 'feature/header') {
      checkTaskCompletion('feature/header', 1);
    }
  };

  const createCommit = () => {
    if (!commitMessage.trim()) {
      setError('Le message de commit est requis');
      return;
    }

    setBranches(prev => prev.map(branch => {
      if (branch.name === selectedBranch) {
        return {
          ...branch,
          commits: [...branch.commits, {
            id: Math.random().toString(36).substr(2, 9),
            message: commitMessage,
            timestamp: new Date(),
            type: commitType
          }]
        };
      }
      return branch;
    }));
    
    setCommitMessage('');
    setError('');
    setSuccess(`✨ Commit ajouté sur la branche ${selectedBranch} !`);
    
    // Vérifier la tâche de commit
    if (selectedBranch === 'feature/header') {
      checkTaskCompletion('commit', 2);
    }
  };

  const mergeBranch = (sourceBranch: string, targetBranch: string) => {
    const sourceBranchData = branches.find(b => b.name === sourceBranch);
    const targetBranchData = branches.find(b => b.name === targetBranch);

    if (!sourceBranchData || !targetBranchData) return;

    // Créer des nouveaux commits dans la branche cible avec des IDs uniques
    const mergedCommits = sourceBranchData.commits.map(commit => ({
      ...commit,
      id: `merged-${commit.id}-${Date.now()}`,
      message: `[${sourceBranch}] ${commit.message}` // Ajouter le nom de la branche source
    }));

    setBranches(prev => prev.map(branch => {
      if (branch.name === targetBranch) {
        return {
          ...branch,
          commits: [...branch.commits, ...mergedCommits]
        };
      }
      return branch;
    }));

    setSuccess(`🎉 Branche ${sourceBranch} mergée dans ${targetBranch} !`);
    
    if (sourceBranch === 'feature/header' && targetBranch === 'main') {
      checkTaskCompletion('merge', 3);
    }
  };

  const checkTaskCompletion = (action: string, taskId: number) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const simulateWorkflow = () => {
    setIsSimulating(true);

    const simulation: SimulationStep[] = [
      {
        action: 'branch',
        name: 'feature/auth',
        from: 'main'
      },
      {
        action: 'commit',
        branch: 'feature/auth',
        message: 'Add login form component',
        type: 'feature'
      },
      {
        action: 'commit',
        branch: 'feature/auth',
        message: 'Implement OAuth authentication',
        type: 'feature'
      },
      {
        action: 'branch',
        name: 'hotfix/security',
        from: 'main'
      },
      {
        action: 'commit',
        branch: 'hotfix/security',
        message: 'Fix security vulnerability in API',
        type: 'hotfix'
      },
      {
        action: 'branch',
        name: 'feature/dashboard',
        from: 'main'
      },
      {
        action: 'commit',
        branch: 'feature/dashboard',
        message: 'Add user statistics widget',
        type: 'feature'
      },
      {
        action: 'commit',
        branch: 'feature/dashboard',
        message: 'Implement data visualization',
        type: 'feature'
      },
      {
        action: 'commit',
        branch: 'feature/dashboard',
        message: 'Fix chart rendering bug',
        type: 'bugfix'
      }
    ];

    simulation.forEach((step, index) => {
      const timeout = setTimeout(() => {
        if (step.action === 'branch' && step.name && step.from) {
          const newBranch: Branch = {
            id: `${step.name}-${Date.now()}`,
            name: step.name,
            color: branchColors[branches.length % branchColors.length],
            commits: [],
            parent: step.from
          };
          setBranches(prev => [...prev, newBranch]);
        } else if (step.action === 'commit' && step.branch && step.message && step.type) {
          setBranches(prev => prev.map(branch => {
            if (branch.name === step.branch) {
              const newCommit: Commit = {
                id: `${branch.id}-commit-${Date.now()}`,
                message: step.message || 'No message',
                timestamp: new Date(),
                type: step.type
              };
              return {
                ...branch,
                commits: [...branch.commits, newCommit]
              };
            }
            return branch;
          }));
        }

        if (index === simulation.length - 1) {
          setIsSimulating(false);
          setSuccess("✨ Simulation terminée ! Essayez de merger les branches dans main");
        }
      }, index * 2000);

      setTimeouts(prev => [...prev, timeout]);
    });
  };

  const stopSimulation = () => {
    timeouts.forEach(clearTimeout);
    setIsSimulating(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Nouvelle section d'introduction */}
      <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Git et les Environnements
        </h2>
        
        {/* Environnements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700 mb-2">🛠️ Développement</h3>
            <p className="text-sm text-gray-600">
              Environnement de test pour les développeurs.
              Branch: develop
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700 mb-2">🔍 Pré-production</h3>
            <p className="text-sm text-gray-600">
              Tests finaux avant mise en production.
              Branch: staging
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-2">🚀 Production</h3>
            <p className="text-sm text-gray-600">
              Version live pour les utilisateurs.
              Branch: main
            </p>
          </div>
        </div>

        {/* Branches principales */}
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">Branches Git</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="font-medium">main :</span>
              <span className="text-gray-600">Code stable en production</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="font-medium">develop :</span>
              <span className="text-gray-600">Développement en cours</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="font-medium">feature/* :</span>
              <span className="text-gray-600">Nouvelles fonctionnalités</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="font-medium">hotfix/* :</span>
              <span className="text-gray-600">Corrections urgentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section DevOps */}
      <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {explanations.devops.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {explanations.devops.description}
        </p>
        <ul className="space-y-2">
          {explanations.devops.bullets?.map((bullet, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <span className="text-orange-500">⚡</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Section combinée Objectifs et En savoir plus */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🎯 Objectifs et Concepts</h2>
          <div className="space-y-4">
            <div className="p-3 bg-white rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">{explanations.branch.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{explanations.branch.description}</p>
              <p className="text-blue-500 text-xs italic mb-3">{explanations.branch.example}</p>
              {/* Tâche associée */}
              <div className="flex items-start gap-3 relative group mt-2 border-t border-gray-100 pt-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  tasks[0].completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {tasks[0].completed && '✓'}
                </div>
                <span className={tasks[0].completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                  {tasks[0].description}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">{explanations.commit.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{explanations.commit.description}</p>
              <p className="text-blue-500 text-xs italic mb-3">{explanations.commit.example}</p>
              {/* Tâche associée */}
              <div className="flex items-start gap-3 relative group mt-2 border-t border-gray-100 pt-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  tasks[1].completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {tasks[1].completed && '✓'}
                </div>
                <span className={tasks[1].completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                  {tasks[1].description}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">{explanations.merge.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{explanations.merge.description}</p>
              <p className="text-blue-500 text-xs italic mb-3">{explanations.merge.example}</p>
              {/* Tâche associée */}
              <div className="flex items-start gap-3 relative group mt-2 border-t border-gray-100 pt-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  tasks[2].completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}>
                  {tasks[2].completed && '✓'}
                </div>
                <span className={tasks[2].completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                  {tasks[2].description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Création de branche */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Créer une nouvelle branche</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Depuis la branche
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              {branches.map(branch => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la nouvelle branche
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="feature/..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              />
              <button
                onClick={createBranch}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Création de commit */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un commit</h2>
        <div className="bg-yellow-50 p-2 rounded-lg mb-4 flex items-center gap-2">
          <span className="text-yellow-600">🎯</span>
          <span className="text-sm">
            Branche active : <strong>{selectedBranch}</strong>
          </span>
        </div>
        <div className="flex gap-2">
          <select
            value={commitType}
            onChange={(e) => setCommitType(e.target.value as 'feature' | 'bugfix' | 'hotfix')}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="feature">Feature</option>
            <option value="bugfix">Bugfix</option>
            <option value="hotfix">Hotfix</option>
          </select>
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Message du commit"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2"
          />
          <button
            onClick={createCommit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Commit
          </button>
        </div>
      </div>

      {/* Messages d'erreur et de succès */}
      {error && (
        <div className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="text-green-500 text-sm mb-4 bg-green-50 p-2 rounded">
          {success}
        </div>
      )}

      {/* Visualisation des branches */}
      <div className="relative overflow-x-auto">
        <div className="flex gap-8">
          {branches.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="min-w-[250px]"
            >
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: branch.color }}
                  />
                  {branch.name}
                  {branch.parent && (
                    <span className="text-xs text-gray-500">
                      (depuis {branch.parent})
                    </span>
                  )}
                </h3>
                <div className="space-y-2">
                  {branch.commits.map((commit) => (
                    <motion.div
                      key={commit.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-2 rounded border border-gray-200 text-sm"
                    >
                      <div className="font-mono text-xs text-gray-500 flex justify-between">
                        <span>{commit.id}</span>
                        {commit.type && (
                          <span className={`px-2 rounded text-white ${
                            commit.type === 'feature' ? 'bg-blue-500' :
                            commit.type === 'bugfix' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}>
                            {commit.type}
                          </span>
                        )}
                      </div>
                      {commit.message}
                    </motion.div>
                  ))}
                </div>
                {branch.name !== 'main' && (
                  <button
                    onClick={() => mergeBranch(branch.name, 'main')}
                    className="mt-4 px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
                  >
                    Merger dans main
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex gap-2">
          <button
            onClick={simulateWorkflow}
            disabled={isSimulating}
            className={`flex-1 p-4 rounded-lg text-white transition-colors ${
              isSimulating 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            {isSimulating ? '⏳ Simulation en cours...' : '🎮 Simuler un workflow Git'}
          </button>
          {isSimulating && (
            <button
              onClick={stopSimulation}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ⏹️ Arrêter
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 