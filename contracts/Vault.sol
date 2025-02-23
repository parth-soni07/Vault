// SPDX-License-Identifier: UNLICENSED
 pragma solidity ^0.8.28;

contract Vault {
    mapping (bytes32 => gambleVault) vaults;
    uint8 public vaultId = 1;
    struct gambleVault {
        address vaultAdmin;
        uint256 vaultId;
        bytes32 vaultKey;
        string vaultName;
        uint8 players;
        bool isActive;
        uint8 vaultValue;
        uint8 activeDuration;
        bytes32 vaultHash;
    }

    function startGameAdmin(
        string memory _vaultName,
        uint8 _players,
        uint8 _activeDuration,
        uint8 _vaultValue
    ) public returns (bytes32){
        gambleVault memory newVault = vaults[vaultId];
        bytes32 _key = keccak256(
            abi.encodePacked(vaultId, _vaultName, msg.sender)
        );
        bytes memory _hashBytes = new bytes(32);
        for (uint i = 0; i < 6; i++) {
            _hashBytes[i] = _key[i];
        }
        bytes32 _hash = bytes32(_hashBytes);
        newVault.vaultId = vaultId;
        newVault.vaultName = _vaultName;
        newVault.activeDuration = _activeDuration;
        newVault.players = _players;
        newVault.vaultValue = _vaultValue;
        newVault.vaultAdmin = msg.sender;
        newVault.isActive = true;
        newVault.vaultHash = _hash;
        newVault.vaultKey = _key;

        vaultId++;
        return _hash;
    }
    function joinVault(bytes32 _hash, uint8 _vaultValue, )  returns () {
        gambleVault storage vault = vaults[]
    }
    constructor() {

    }
}
