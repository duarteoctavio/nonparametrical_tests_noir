# Utilities

## Test Run Reporter

### Mocha JSON format

```
{
  "results": {
    "tool": {
      "name": "mocha"
    },
    "summary": {
      "tests": 1,
      "passed": 1,
      "failed": 0,
      "pending": 0,
      "skipped": 0,
      "other": 0,
      "start": 1706828654274,
      "stop": 1706828655782
    },
    "tests": [
      {
        "name": "ctrf should generate the same report with any tool",
        "status": "passed",
        "duration": 100
      }
    ],
  }
}
```

### Command (unfinished)

`nargo test | sed "s/\[nonparametrical_tests\] Testing //" | sed "s/^/\{\"name\": \"/" | sed "s/ \.\.\. /\; \"status\"\: /"`

### Example input (output of nargo test)

```
[nonparametrical_tests] Running 10 test functions
[nonparametrical_tests] Testing test_is_abs_sorted ... ok
[nonparametrical_tests] Testing test_group_equals ... ok
[nonparametrical_tests] Testing test_range_average ... ok
[nonparametrical_tests] Testing test_is_abs_sorted_fails ... ok
[nonparametrical_tests] Testing test_abs ... ok
[nonparametrical_tests] Testing test_set_contains_elem ... ok
[nonparametrical_tests] Testing test_assign_wilcox_scores ... ok
[nonparametrical_tests] Testing test_rejection ... ok
[nonparametrical_tests] Testing test_verification ... ok
[nonparametrical_tests] Testing statistic_calculation ... ok
[nonparametrical_tests] 10 tests passed
```

### Example result this far

```
{"name": "[nonparametrical_tests] Running 10 test functions
{"name": "test_verification; "status": ok
{"name": "test_abs; "status": ok
{"name": "test_group_equals; "status": ok
{"name": "test_set_contains_elem; "status": ok
{"name": "test_range_average; "status": ok
{"name": "test_is_abs_sorted; "status": ok
{"name": "test_is_abs_sorted_fails; "status": ok
{"name": "test_assign_wilcox_scores; "status": ok
{"name": "statistic_calculation; "status": ok
{"name": "test_rejection; "status": ok
{"name": "[nonparametrical_tests] 10 tests passed
```
