import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlloraTopic } from "../../utils/alloraTopics";
import { EIP6963ProviderDetail } from "../../types/wallet";
import { Loading } from "../Loading/Loading";
import { Modal } from "../Modal/PredictionModal";
import { WalletConnect } from "../WalletConnect/WalletConnect";
import { TopicSelection } from "../TopicSelection/TopicSelection";
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { Button } from "../Button/Button";
interface HeroProps {
  options: AlloraTopic[];
}

export const Hero: React.FC<HeroProps> = ({ options }) => {
  const [userAccount, setUserAccount] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [output, setOutput] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [selectedTopicName, setSelectedTopicName] = useState<string>("");

  const providers = useSyncProviders();
  const navigate = useNavigate();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setOutput(null);
    setSelectedTopicId(null);
    setSelectedTopicName("");
  };

  const handleSubmit = async () => {
    try {
      if (selectedTopicId !== null) {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/run-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_id: selectedTopicId }),
        });
        const data = await response.json();
        if (response.ok) {
          setOutput(data.inference);
          setShowModal(true);
        } else {
          setOutput(`Error: ${data.error}`);
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      setOutput("An error occurred while fetching the inference.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {!userAccount ? (
          <WalletConnect
            userAccount={userAccount}
            selectedWallet={selectedWallet}
            providers={providers}
            onConnect={handleConnect}
          />
        ) : (
          <>
            <h1 className="text-5xl font-bold text-[#a3ff47] mb-6 leading-tight">
              A never <span className="text-yellow-300">fore</span>SEEN Vault
            </h1>
            <p className="text-gray-300 text-xl mb-12"></p>

            <TopicSelection
              selectedTopicId={selectedTopicId}
              options={options}
              onTopicSelect={(topicId, topicName) => {
                setSelectedTopicId(topicId);
                setSelectedTopicName(topicName);
              }}
              onSubmit={handleSubmit}
            />
            <Button onClick={handleSubmit} disabled={selectedTopicId === null}>
              {selectedTopicId !== null
                ? `Submit (${selectedTopicName})`
                : "Select a topic to click me 😁"}
            </Button>
            <Button onClick={() => navigate("/select-vault")}>
              Enter Vault 🔐
            </Button>

            <WalletConnect
              userAccount={userAccount}
              selectedWallet={selectedWallet}
              providers={providers}
              onConnect={handleConnect}
            />
          </>
        )}
      </div>

      <Loading isLoading={isLoading} />
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        output={output || ""}
      />
    </div>
  );
};
