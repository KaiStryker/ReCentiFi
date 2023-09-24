// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

// Import the Ownable contract for ownership-related functionalities
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// Import interface for pool management
import {IPoolManager} from "@uniswap/v4-core/contracts/interfaces/IPoolManager.sol";
// Import the Hooks library for hook-related functionalities
import {Hooks} from "@uniswap/v4-core/contracts/libraries/Hooks.sol";
// Import BaseHook for the base functionalities
import {BaseHook} from "lib/v4-periphery/contracts/BaseHook.sol";
// Import ZKPVerifier for the ZKP verification
import "./ZKPVerifier.sol";

/**
 * @title An interface for checking whether an address has a valid Polygon ID
 * @dev This is used to verify if a user has the required Polygon ID
 */
interface IPolygonID {
    /**
     * @notice Check if an address has a valid Polygon ID
     * @param _addr The address to check
     * @return valid True if the address has a valid Polygon ID, otherwise false
     */
    function hasValidPolygonID(address _addr) external view returns (bool valid);
}

/**
 * PolgygonIDHook Contract
 * @dev This contract ensures that only addresses with a valid Polygon ID can trade on the pool.
 */
contract PolgygonIDHook is BaseHook, Ownable, ZKPVerifier {
    // Instance of the Polygon ID checker interface
    IPolygonID public polygonIDChecker;

    /**
     * @notice Constructor for creating the PolgygonIDHook contract
     * @param _poolManager Address of the pool manager
     * @param _polygonIDChecker Address of the Polygon ID checker contract
     */
    constructor(
        IPoolManager _poolManager,
        address _polygonIDChecker
    ) BaseHook(_poolManager) {
        polygonIDChecker = IPolygonID(_polygonIDChecker);
    }

    /**
     * @dev Modifier to ensure that the transaction sender has a valid Polygon ID
     * Throws an error if the sender doesn't have a valid Polygon ID
     */
    modifier onlyPermitPolygonID() {
        require(
            proofs[msg.sender][requestId] = true,
            "The pool is available for valid users."
        );
        _;
    }

    /**
     * @notice Returns the hooks that this contract supports
     * @return A Hooks.Calls struct indicating which functions are supported
     */
    function getHooksCalls() public pure override returns (Hooks.Calls memory) {
        return
            Hooks.Calls({
                beforeInitialize: false,   // Does not use beforeInitialize hook
                afterInitialize: false,    // Does not use afterInitialize hook
                beforeModifyPosition: true, // *Uses beforeModifyPosition hook*
                afterModifyPosition: false, // Does not use afterModifyPosition hook
                beforeSwap: true,          // *Uses beforeSwap hook*
                afterSwap: false,          // Does not use afterSwap hook
                beforeDonate: false,       // Does not use beforeDonate hook
                afterDonate: false         // Does not use afterDonate hook
            });
    }

    /*
     * @notice Ensures that a trader modifying their position has a valid Polygon ID
     * @param PoolKey A struct containing pool-related data
     * @param ModifyPositionParams A struct containing data related to position modification
     * @return The selector of the beforeModifyPosition function
     */
     
     // The beforeModifyPosition has a custom modifier "onlyPermitPolygonID" to ensure that the caller has a valid Polygon ID
    function beforeModifyPosition(
        address, 
        PoolKey calldata,
        IPoolManager.ModifyPositionParams calldata
    ) external view override poolManagerOnly onlyPermitPolygonID returns (bytes4) {
        return BaseHook.beforeModifyPosition.selector;  // Return the function selector (unique identifier) for "beforeModifyPosition" from the BaseHook contract
    }

    /*
     * @notice Ensures that a trader swapping tokens has a valid Polygon ID
     * @param PoolKey A struct containing pool-related data
     * @param SwapParams A struct containing data related to the swap
     * @return The selector of the beforeSwap function
     */
     // The beforeSwap has a custom modifier "onlyPermitPolygonID" to ensure that the caller has a valid Polygon ID
    function beforeSwap(
        address,
        PoolKey calldata,
        IPoolManager.SwapParams calldata
    ) external view override poolManagerOnly onlyPermitPolygonID returns (bytes4) {
        return BaseHook.beforeSwap.selector; // Return the function selector (unique identifier) for "beforeSwap" from the BaseHook contract
}
    }
