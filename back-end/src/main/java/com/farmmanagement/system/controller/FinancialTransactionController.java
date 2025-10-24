package com.farmmanagement.system.controller;

import com.farmmanagement.system.model.FinancialTransaction;
import com.farmmanagement.system.repository.FinancialTransactionRepository;
import com.farmmanagement.system.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/financial-transactions")
public class FinancialTransactionController {

    @Autowired
    private FinancialTransactionRepository financialTransactionRepository;

    @Autowired
    private AuditService auditService;

    @GetMapping
    public List<FinancialTransaction> getTransactionsByFarm(@RequestParam String farmId) {
        return financialTransactionRepository.findByFarmId(farmId);
    }

    @PostMapping
    public FinancialTransaction createTransaction(@RequestBody FinancialTransaction transaction, @RequestHeader("user-id") String userId) {
        FinancialTransaction newTransaction = financialTransactionRepository.save(transaction);
        auditService.logEvent(userId, "CREATE_FINANCIAL_TRANSACTION", "FinancialTransaction", newTransaction.getId(),
                "Logged transaction of " + newTransaction.getAmount() + " for " + newTransaction.getDescription());
        return newTransaction;
    }
}
