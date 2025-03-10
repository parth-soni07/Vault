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
        uint8 vaultValue;
        uint8 activeDuration;
        uint256 startTime;
        bytes32 vaultHash;
    }

    mapping(bytes32 => GambleVault) public vaults;
    mapping(bytes32 => address[]) public vaultPlayers;
    mapping(bytes32 => mapping(address => uint256[3])) public playerValues;
    uint8 public vaultId = 1;

    event VaultCreated(bytes32 vaultHash, address indexed admin);
    event PlayerJoined(
        bytes32 vaultHash,
        address indexed player,
        uint256 amount
    );
    event VaultOpened(
        bytes32 vaultHash,
        address indexed admin,
        uint256 totalAmount
    );

    function startGameAdmin(
        string memory _vaultName,
        uint8 _players,
        uint8 _activeDuration,
        uint8 _vaultValue
    ) public returns (bytes32) {
        bytes32 _key = keccak256(
            abi.encodePacked(vaultId, _vaultName, msg.sender)
        );
        bytes32 _hash = keccak256(abi.encodePacked(_vaultName, msg.sender));

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

    function joinVault(
        bytes32 _hash,
        uint256[3] memory _values
    ) public payable {
        GambleVault storage vault = vaults[_hash];
        require(vault.vaultHash == _hash, "Invalid Hash");
        require(vault.isActive, "Vault is no more active");
        require(
            msg.value >= vault.vaultValue,
            "Insufficient funds to join this vault"
        );

        vaultPlayers[_hash].push(msg.sender);
        require(
            vaultPlayers[_hash].length <= vault.players,
            "Vault player limit exceeded"
        );

        playerValues[_hash][msg.sender] = _values;

        if (vaultPlayers[_hash].length == vault.players) {
            vault.isActive = false;
            vault.startTime = block.timestamp; // Timer starts when vault is full
        }

        emit PlayerJoined(_hash, msg.sender, msg.value);
    }

    function openVault(bytes32 _hash) public returns (address) {
        GambleVault storage vault = vaults[_hash];
        require(!vault.isActive, "Vault is still active");
        require(
            vault.vaultAdmin == msg.sender,
            "Only the Admin Can Open The vault"
        );
        address[] memory players = vaultPlayers[_hash];
        uint256 totalAmount = vault.vaultValue * players.length;

        // Transfer total vault amount to the admin
        payable(vault.vaultAdmin).transfer(totalAmount);

        emit VaultOpened(_hash, vault.vaultAdmin, totalAmount);

        return vault.vaultAdmin;
    }

    // Function to get vault players
    function getVaultPlayers(
        bytes32 _hash
    ) public view returns (address[] memory) {
        return vaultPlayers[_hash];
    }
    
    // Function to get vault name
    function getVaultName(bytes32 _hash) public view returns (string memory) {
        return vaults[_hash].vaultName;
    }

    // Function to get vault amount
    function getVaultAmount(bytes32 _hash) public view returns (uint8) {
        return vaults[_hash].vaultValue;
    }

    // Function to get vault duration
    function getVaultAdmin(bytes32 _hash) public view returns (address) {
        return vaults[_hash].vaultAdmin;
    }
}
