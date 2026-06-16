import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, ArrowRight } from 'lucide-react';
import type { Participant, ContractFile } from '../types/signature';
import { HomeLayout } from '../components/layout/home_layout';
import { ContractUpload } from '../components/signature/contract_upload';
import { ParticipantForm } from '../components/signature/participant_form';
import { ParticipantCard } from '../components/signature/participant_card';

export const ElectronicSignatureContract: React.FC = () => {
  const navigate = useNavigate();
  const [contractFile, setContractFile] = useState<ContractFile | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleAddParticipant = (participant: Omit<Participant, 'id'>) => {
    const newParticipant = {
      ...participant,
      id: Date.now().toString(),
    };
    setParticipants([...participants, newParticipant]);
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleContinue = () => {
    if (!contractFile) {
      alert('Please upload the contract PDF');
      return;
    }
    if (participants.length === 0) {
      alert('Please add at least one participant');
      return;
    }

    navigate('/payment-checkout', {
      state: {
        paymentFlow: 'electronicSignature',
        participants,
        contractFile,
        contractFileName: contractFile.name,
      },
    });
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <HomeLayout
      currentRoute="/electronic-signature-contract"
      onNavigate={handleNavigate}
    >
      <div className="max-w-4xl mx-auto space-y-5 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Electronic Signature
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Upload the contract and add participants for electronic signing
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <FileText size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900">Lease Contract</h2>
              <p className="text-xs text-gray-500">Upload the PDF contract to be signed</p>
            </div>
          </div>
          <ContractUpload onFileUpload={setContractFile} />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100">
                <Users size={22} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900">Participants</h2>
                <p className="text-xs text-gray-500">Add people who need to sign this contract</p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-bold rounded-full">
              {participants.length} participants
            </span>
          </div>

          <ParticipantForm onAddParticipant={handleAddParticipant} />

          {participants.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200 mt-4">
              <Users size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No participants added</p>
              <p className="text-xs text-gray-400">Add people who need to sign this contract</p>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {participants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  onRemove={() => handleRemoveParticipant(participant.id)}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Continue to Payment
          <ArrowRight size={18} />
        </button>
      </div>
    </HomeLayout>
  );
};
