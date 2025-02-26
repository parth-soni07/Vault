// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Vault {
    struct GambleVault {
        address vaultAdmin;
        uint256 vaultId;
        bytes32 vaultKey;
        string vaultName;
        uint8 players;
        bool isActive;
        uint8 vaultValue; // Required amount to join (in wei)
        uint8 activeDuration;
        uint256 startTime;
        bytes32 vaultHash;
    }

    mapping(bytes32 => GambleVault) public vaults; // Maps vaultHash → GambleVault
    mapping(bytes32 => address[]) public vaultPlayers; // Tracks players in each vault
    uint8 public vaultId = 1;

    event VaultCreated(bytes32 vaultHash, address indexed admin);
    event PlayerJoined(
        bytes32 vaultHash,
        address indexed player,
        uint256 amount
    );
    event VaultOpened(bytes32 vaultHash);

    function startGameAdmin(
        string memory _vaultName,
        uint8 _players,
        uint8 _activeDuration,
        uint8 _vaultValue
    ) public returns (bytes32) {
        bytes32 _key = keccak256(
            abi.encodePacked(vaultId, _vaultName, msg.sender)
        );

        bytes32 _hash = keccak256(
            abi.encodePacked(_vaultName, msg.sender)
        );
        

        // Store vault in mapping
        vaults[_hash] = GambleVault({
            vaultAdmin: msg.sender,
            vaultId: vaultId,
            vaultKey: _key,
            vaultName: _vaultName,
            players: _players,
            isActive: true,
            vaultValue: _vaultValue,
            activeDuration: _activeDuration,
            startTime: 0,
            vaultHash: _hash
        });

        emit VaultCreated(_hash, msg.sender);
        vaultId++;
        return _hash;
    }
    function getHash (string memory _vaultName) public view returns (bytes32){
        
    }
    function joinVault(bytes32 _hash) public payable {
        GambleVault storage vault = vaults[_hash];
        require(vault.vaultHash == _hash, "Invalid Hash");
        require(vault.isActive, "Vault is no more active");
        require(
            msg.value >= vault.vaultValue,
            "Insufficient funds to join this vault"
        );

        vaultPlayers[_hash].push(msg.sender);
        if (getVaultPlayers(_hash).length == vault.players) {
            vault.isActive = false;
            vault.startTime = block.timestamp;
        }
        emit PlayerJoined(_hash, msg.sender, msg.value);
    }

    function openVault(bytes32 _hash) public {
        GambleVault storage vault = vaults[_hash];
        require(!vault.isActive, "Vault is still active");
        require(
            block.timestamp >=
                vault.startTime + (vault.activeDuration * 1 minutes),
            "Vault duration has not ended"
        );

        address[] memory players = vaultPlayers[_hash];
        uint256 refundAmount = vault.vaultValue;

        for (uint256 i = 0; i < players.length; i++) {
            payable(players[i]).transfer(refundAmount);
        }

        emit VaultOpened(_hash);
    }

    function getVaultPlayers(bytes32 _hash)
        public
        view
        returns (address[] memory)
    {
        return vaultPlayers[_hash];
    }
}
