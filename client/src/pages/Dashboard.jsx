import React from 'react'
import Sidebar from './Sidebar'
import NoteContent from './NoteContent';

const Dashboard = () => {
 return (
   <div className="flex h-screen">
     <div className="w-1/3 border-r border-gray-300">
       <Sidebar />
     </div>
     <div className="w-2/3 p-6">
       <NoteContent />
     </div>
   </div>
 );
}

export default Dashboard