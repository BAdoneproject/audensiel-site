'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Candidate {
  id: number;
  name: string;
  role: string;
  status: 'new' | 'interview' | 'offer' | 'hired';
  experience: number;
  skills: string[];
  lastUpdate: Date;
}

interface CandidateStats {
  total: number;
  inProgress: number;
  hired: number;
  byRole: { [key: string]: number };
}

const logStyles = {
  action: 'color: #3B82F6; font-weight: bold;',
  success: 'color: #10B981; font-weight: bold;',
  warning: 'color: #F59E0B; font-weight: bold;',
  error: 'color: #EF4444; font-weight: bold;',
  info: 'color: #6366F1; font-weight: bold;'
};

export default function RecruitmentDashboard() {
  const roles = ['Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Data Engineer', 'Tech Lead'];

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Marie Laurent",
      role: "Frontend Developer",
      status: "interview",
      experience: 3,
      skills: ["React", "TypeScript"],
      lastUpdate: new Date()
    },
    {
      id: 2,
      name: "Thomas Dubois",
      role: "Backend Developer",
      status: "interview",
      experience: 5,
      skills: ["Node.js", "Python"],
      lastUpdate: new Date()
    },
    {
      id: 3,
      name: "Sophie Chen",
      role: "DevOps Engineer",
      status: "new",
      experience: 4,
      skills: ["Docker", "Kubernetes"],
      lastUpdate: new Date()
    },
    {
      id: 4,
      name: "Lucas Martin",
      role: "Frontend Developer",
      status: "offer",
      experience: 7,
      skills: ["React", "Vue.js"],
      lastUpdate: new Date()
    },
    {
      id: 5,
      name: "Emma Bernard",
      role: "Tech Lead",
      status: "interview",
      experience: 8,
      skills: ["Java", "Spring"],
      lastUpdate: new Date()
    },
    {
      id: 6,
      name: "Alexandre Petit",
      role: "Data Engineer",
      status: "new",
      experience: 2,
      skills: ["Python", "SQL"],
      lastUpdate: new Date()
    },
    {
      id: 7,
      name: "Julie Moreau",
      role: "Backend Developer",
      status: "hired",
      experience: 6,
      skills: ["Java", "Spring Boot"],
      lastUpdate: new Date()
    },
    {
      id: 8,
      name: "Hugo Leroy",
      role: "DevOps Engineer",
      status: "interview",
      experience: 4,
      skills: ["AWS", "Terraform"],
      lastUpdate: new Date()
    }
  ]);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    role: roles[0],
    experience: 0,
    skills: [] as string[]
  });

  const [isSimulating, setIsSimulating] = useState(false);

  // Ajout d'un état pour suivre la progression
  const [simulationSpeed, setSimulationSpeed] = useState(2000);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  // Ajouter cet état
  const [simulatedDays, setSimulatedDays] = useState(0);

  // Ajouter l'état pour le thème
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ajouter la constante pour la durée maximale
  const MAX_SIMULATION_DAYS = 30;

  // Calcul des statistiques
  const calculateStats = (): CandidateStats => {
    return {
      total: candidates.length,
      inProgress: candidates.filter(c => c.status !== 'hired').length,
      hired: candidates.filter(c => c.status === 'hired').length,
      byRole: candidates.reduce((acc, curr) => {
        acc[curr.role] = (acc[curr.role] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    };
  };

  // Simplifier la fonction logAction
  const logAction = (action: string, type: keyof typeof logStyles = 'info') => {
    console.log(`%c[J${simulatedDays}] ${action}`, logStyles[type]);
  };

  // Simplifier les messages de log dans les différentes fonctions
  const updateCandidateStatus = (candidateId: number, newStatus: Candidate['status']) => {
    setCandidates(prev => prev.map(candidate => {
      if (candidate.id === candidateId) {
        logAction(`${candidate.name} → ${newStatus}`, 'action');
        return { 
          ...candidate, 
          status: newStatus, 
          lastUpdate: new Date()
        };
      }
      return candidate;
    }));
  };

  const deleteCandidate = (candidateId: number) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      logAction(`❌ Suppression: ${candidate.name}`, 'warning');
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
    }
  };

  const addCandidate = () => {
    if (!newCandidate.name) {
      logAction('⚠️ Erreur: Nom requis', 'warning');
      return;
    }
    
    const candidate = {
      id: Date.now(),
      ...newCandidate,
      status: 'new' as const,
      lastUpdate: new Date()
    };

    logAction(`✨ Nouveau: ${candidate.name} (${candidate.role})`, 'success');
    setCandidates(prev => [...prev, candidate]);
    setNewCandidate({ name: '', role: roles[0], experience: 0, skills: [] });
  };

  // Modifier l'effet de simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating && simulatedDays < MAX_SIMULATION_DAYS) {
      logAction('▶️ Simulation démarrée', 'info');

      interval = setInterval(() => {
        setSimulatedDays(prev => {
          const nextDay = prev + 1;
          if (nextDay >= MAX_SIMULATION_DAYS) {
            setIsSimulating(false);
            logAction('✅ Simulation terminée (30 jours)', 'success');
          }
          return Math.min(nextDay, MAX_SIMULATION_DAYS);
        });

        // Simulation des événements basée sur les jours
        setCandidates(prev => prev.map(candidate => {
          const statusFlow = ['new', 'interview', 'offer', 'hired'];
          const currentIndex = statusFlow.indexOf(candidate.status);
          
          // Probabilité de progression basée sur le nombre de jours passés
          const progressChance = Math.random() * (simulatedDays % 5 === 0 ? 1.5 : 1);
          if (progressChance > 0.7 && currentIndex < statusFlow.length - 1) {
            const nextStatus = statusFlow[currentIndex + 1] as Candidate['status'];
            
            logAction(`📈 ${candidate.name}: ${candidate.status} → ${nextStatus}`, 'action');

            return {
              ...candidate,
              status: nextStatus,
              lastUpdate: new Date()
            };
          }
          return candidate;
        }));

        // Ajout aléatoire de nouveaux candidats basé sur les jours
        if (simulatedDays % 3 === 0 && Math.random() > 0.5) {
          const randomNames = [
            "Alex Martin", "Sam Dubois", "Julie Chen", "Chris Wilson",
            "Emma Bernard", "Lucas Silva", "Sarah Cohen", "Max Laurent"
          ];
          
          const newCandidate = {
            id: Date.now(),
            name: randomNames[Math.floor(Math.random() * randomNames.length)],
            role: roles[Math.floor(Math.random() * roles.length)],
            status: 'new' as const,
            experience: Math.floor(Math.random() * 10) + 1,
            skills: [],
            lastUpdate: new Date()
          };

          logAction(`👋 ${newCandidate.name} postule (${newCandidate.role})`, 'success');

          setCandidates(prev => [...prev, newCandidate]);
        }
      }, simulationSpeed / 2);
    }
    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, roles, simulatedDays]);

  const stats = calculateStats();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg mt-8 relative transition-colors duration-200`}>
      {/* Titre et contrôles */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className={`font-semibold text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Suivi des Recrutements
          </h4>
          {isSimulating && (
            <>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Jour {simulatedDays} sur {MAX_SIMULATION_DAYS}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${(simulatedDays / MAX_SIMULATION_DAYS) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Progression : {Math.round((simulatedDays / MAX_SIMULATION_DAYS) * 100)}%
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value="2000">1 jour / 2 sec</option>
            <option value="1000">1 jour / 1 sec</option>
            <option value="500">2 jours / sec</option>
          </select>
          <button
            onClick={() => {
              if (!isSimulating) {
                setSimulatedDays(0); // Réinitialiser les jours au démarrage
              }
              setIsSimulating(!isSimulating);
            }}
            className={`px-4 py-2 rounded-md ${
              isSimulating 
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isSimulating ? 'Arrêter la simulation' : 'Simuler le processus'}
          </button>
        </div>
      </div>

      {/* Affichage de la dernière action */}
      {isSimulating && (
        <div className="mb-6 p-3 bg-blue-50 rounded-lg text-blue-700 animate-fade-in">
          {/* ... lastAction existant ... */}
        </div>
      )}

      {/* Statistiques avec animations */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-6 rounded-xl`}>
          <h5 className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Candidats Actifs
          </h5>
          <p className="text-3xl font-bold text-blue-500 mt-2">{stats.inProgress}</p>
          <p className="text-sm text-gray-500 mt-1">En cours de process</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-green-50 to-green-100'} p-6 rounded-xl`}>
          <h5 className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Recrutements Finalisés
          </h5>
          <p className="text-3xl font-bold text-green-500 mt-2">{stats.hired}</p>
          <p className="text-sm text-gray-500 mt-1">Taux: {Math.round((stats.hired / stats.total) * 100)}%</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-purple-100'} p-6 rounded-xl`}>
          <h5 className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Candidatures
          </h5>
          <p className="text-3xl font-bold text-purple-500 mt-2">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-1">Depuis {simulatedDays} jours</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-orange-50 to-orange-100'} p-6 rounded-xl`}>
          <h5 className={`text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            En Entretien
          </h5>
          <p className="text-3xl font-bold text-orange-500 mt-2">
            {candidates.filter(c => c.status === 'interview').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {Math.round((candidates.filter(c => c.status === 'interview').length / stats.total) * 100)}% du total
          </p>
        </div>
      </motion.div>

      {/* Formulaire d'ajout avec tooltips */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg mb-6`}>
        <h5 className={`font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Ajouter un nouveau candidat
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group">
            <input
              type="text"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
              placeholder="Nom du candidat"
              className={`p-2 border rounded w-full ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300'
              }`}
            />
            <div className="invisible group-hover:visible absolute -top-8 left-0 bg-gray-800 text-white p-2 rounded text-xs">
              Entrez le nom complet du candidat
            </div>
          </div>
          <select
            value={newCandidate.role}
            onChange={(e) => setNewCandidate({...newCandidate, role: e.target.value})}
            className={`p-2 border rounded ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <div className="relative group">
            <div className="flex items-center border rounded overflow-hidden">
              <input
                type="number"
                min="0"
                max="40"
                value={newCandidate.experience}
                onChange={(e) => setNewCandidate({...newCandidate, experience: Number(e.target.value)})}
                className={`p-2 w-full focus:outline-none ${
                  isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Années"
              />
              <span className="px-2 bg-gray-50 text-gray-500 border-l">
                ans d&apos;XP
              </span>
            </div>
            <div className="invisible group-hover:visible absolute -top-8 left-0 bg-gray-800 text-white p-2 rounded text-xs">
              Entrez le nombre d&apos;années d&apos;expérience
            </div>
          </div>
          <button
            onClick={addCandidate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter un candidat
          </button>
        </div>
      </div>

      {/* Table des candidats avec animations */}
      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} sticky top-0`}>
            <tr>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nom</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Poste</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Statut</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expérience</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Compétences</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dernière mise à jour</th>
              <th className={`p-2 text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map(candidate => (
              <motion.tr
                key={candidate.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                className={`border-t ${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                } ${
                  selectedCandidate === candidate.id 
                    ? isDarkMode ? 'bg-gray-600' : 'bg-blue-50'
                    : ''
                }`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{candidate.name}</td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{candidate.role}</td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <select
                    value={candidate.status}
                    onChange={(e) => updateCandidateStatus(candidate.id, e.target.value as Candidate['status'])}
                    className={`px-2 py-1 rounded text-xs ${
                      candidate.status === 'hired' ? 'bg-green-100 text-green-800' :
                      candidate.status === 'offer' ? 'bg-purple-100 text-purple-800' :
                      candidate.status === 'interview' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="new">Nouveau</option>
                    <option value="interview">Entretien</option>
                    <option value="offer">Offre</option>
                    <option value="hired">Recruté</option>
                  </select>
                </td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{candidate.experience} ans</td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {candidate.lastUpdate.toLocaleString()}
                </td>
                <td className={`p-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCandidate(candidate.id);
                      }}
                      className="text-red-500 hover:text-red-700 tooltip-trigger"
                      title="Supprimer le candidat"
                    >
                      ×
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende des statuts */}
      <div className={`mt-6 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
        <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Légende des statuts
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { status: 'new', label: 'Nouveau', color: 'gray' },
            { status: 'interview', label: 'Entretien', color: 'yellow' },
            { status: 'offer', label: 'Offre', color: 'purple' },
            { status: 'hired', label: 'Recruté', color: 'green' }
          ].map(item => (
            <div key={item.status} className={`p-2 bg-${item.color}-100 rounded text-${item.color}-800 text-sm text-center`}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Bouton de thème */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2
              ${isDarkMode ? 'bg-gray-600 text-yellow-400' : 'bg-gray-200 text-gray-600'}
              hover:opacity-80 transition-colors`}
          >
            {isDarkMode ? '☀️ Mode clair' : '🌙 Mode sombre'}
          </button>
        </div>
      </div>
    </div>
  );
} 