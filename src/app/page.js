import { Todo } from './components/Todo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-indigo-950 relative overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-1/4 h-1/4 rounded-full bg-blue-600/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        <Todo />
      </div>
    </div>
  );
} 