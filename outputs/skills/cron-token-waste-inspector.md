# Cron Token Waste Inspector

## Purpose

检查 OpenClaw / EasyClaw Agent 的 cron 任务是否因为碎片化、重复上下文加载、低价值巡检而浪费 token，并输出可执行的合并建议。

## Trigger

当用户提到 cron、heartbeat、token 成本、定时任务、自动化巡检、OpenClaw Gateway 时使用。

## Inputs

- cron 任务列表
- 每个任务的运行频率
- 执行模式：isolated / main / heartbeat
- 每次任务平均上下文大小或估算 token
- 任务失败风险和优先级

## Output

- 浪费来源
- 可合并任务组
- 保留独立运行的任务
- 预估 token 节省
- 回滚策略

## Workflow

1. 按运行频率和上下文依赖给 cron 分组。
2. 识别多个 isolated 任务重复加载相同上下文的情况。
3. 判断哪些任务可以合并到 main session 串行执行。
4. 判断哪些低价值巡检可以挂到 heartbeat 中。
5. 输出合并后的调度表。
6. 给出节省估算和失败回滚策略。

## Safety Boundaries

- 不自动删除任务。
- 不建议合并高风险、强隔离、安全敏感任务。
- 不在没有日志证据时承诺精确节省比例。
- 所有建议必须可人工审查。

## Example

Input: 5 个每小时运行的 isolated cron，均读取同一项目上下文。  
Output: 合并为 1 个 main cron 串行执行，并把低价值状态巡检挂到 heartbeat，预估减少 18%-35% token。
