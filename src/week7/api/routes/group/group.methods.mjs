import GroupDto from '../../../dto/Group.dto.mjs';

export const getGroup = (groupService) => async (req, res, next) => {
  const request = req.body;

  try {
    const getGroupResult = await groupService.getGroup(request);

    return res.status(200).json(GroupDto.fromObject(getGroupResult));
  } catch (e) {
    return next(e);
  }
};

export const addGroup = (groupService) => async (req, res, next) => {
  try {
    const groupDTO = GroupDto.fromObject(req.body);
    const addGroupResult = await groupService.addGroup(groupDTO);

    return res.status(201).json(GroupDto.fromObject(addGroupResult));
  } catch (e) {
    return next(e);
  }
};

export const deleteGroup = (groupService) => async (req, res, next) => {
  try {
    const group = req.body;
    await groupService.deleteGroup(group);

    return res.json({ text: 'Group successfully has been deleted' });
  } catch (e) {
    return next(e);
  }
};

export const updateGroup = (groupService) => async (req, res, next) => {
  try {
    const group = GroupDto.fromObject(req.body);
    const updateGroupResult = await groupService.updateGroup(group);

    return res.json(GroupDto.fromObject(updateGroupResult));
  } catch (e) {
    return next(e);
  }
};

export const listGroups = (groupService) => async (req, res, next) => {
  try {
    const request = req.body;
    const listGroupResult = await groupService.listGroups(request);

    return res.json(listGroupResult);
  } catch (e) {
    return next(e);
  }
};
