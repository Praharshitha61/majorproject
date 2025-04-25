// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BankAppointment {
    struct Appointment {
        address customer;
        string bankName;
        string branch;
        string serviceType;
        string employeeRole;
        string status;
        uint256 timestamp;
        string documentHash;
    }

    Appointment[] public appointments;

    event AppointmentCreated(
        uint indexed appointmentId,
        address customer,
        string bankName,
        string branch,
        string serviceType,
        string employeeRole
    );

    event AppointmentStatusUpdated(uint indexed appointmentId, string status);
    event DocumentHashStored(uint indexed appointmentId, string documentHash);

    function createAppointment(
        string memory bankName,
        string memory branch,
        string memory serviceType,
        string memory employeeRole
    ) public {
        appointments.push(
            Appointment(
                msg.sender,
                bankName,
                branch,
                serviceType,
                employeeRole,
                "Booked",
                block.timestamp,
                ""
            )
        );
        emit AppointmentCreated(
            appointments.length - 1,
            msg.sender,
            bankName,
            branch,
            serviceType,
            employeeRole
        );
    }

    function updateStatus(uint appointmentId, string memory status) public {
        require(appointmentId < appointments.length, "Invalid ID");
        appointments[appointmentId].status = status;
        emit AppointmentStatusUpdated(appointmentId, status);
    }

    function storeDocumentHash(uint appointmentId, string memory hash) public {
        require(appointmentId < appointments.length, "Invalid ID");
        appointments[appointmentId].documentHash = hash;
        emit DocumentHashStored(appointmentId, hash);
    }

    function getAppointment(uint id) public view returns (Appointment memory) {
        require(id < appointments.length, "Invalid ID");
        return appointments[id];
    }

    function getAllAppointments() public view returns (Appointment[] memory) {
        return appointments;
    }
}























