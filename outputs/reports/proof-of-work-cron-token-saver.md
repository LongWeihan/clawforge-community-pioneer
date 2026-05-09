# Skill Proof-of-Work: Cron Token Waste Inspector

## Summary

- Baseline score: 62
- With Skill score: 84
- Quality delta: +22
- Token delta: -18%
- Verdict: publish_ready

## Cases

### 碎片化 cron

- Baseline: 只发现任务数量多，没有指出重复上下文加载。
- With Skill: 识别 5 个 isolated cron 可合并为 1 个 main cron。
- Passed: true

### 重复心跳任务

- Baseline: 建议减少频率，但没有区分 heartbeat 和业务任务。
- With Skill: 保留 heartbeat，把低价值扫描改为随心跳捎带。
- Passed: true

### 跨项目监控任务

- Baseline: 给出泛化优化建议，无法落地。
- With Skill: 输出按项目合并的调度表和失败回滚策略。
- Passed: true


## Conclusion

该 Skill 不以“多生成内容”为目标，而以减少误判、提升建议可执行性和降低 token 成本为目标。低于质量阈值时，ClawForge 会阻止发布。
